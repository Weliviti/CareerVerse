import json
from firebase_admin import firestore
from services.firebase_admin_service import get_db_client
from services.gemini_service import GeminiService
from config import settings


class EvaluationService:
    def __init__(self):
        self._db = None
        self._gemini = None
        # Global appId for Firestore paths — must match persona.py's app_id
        self.app_id = "sdgp-careerverse-2026"

    @property
    def db(self):
        if self._db is None:
            self._db = get_db_client()
        return self._db

    @property
    def gemini(self):
        if self._gemini is None:
            self._gemini = GeminiService(purpose="evaluator")
        return self._gemini

    async def evaluate_session(self, session_id: str):
        """
        Fetches the transcript from Firestore and evaluates it with Gemini AI.

        Unity writes DIRECTLY to the root /sessions/ collection via its own Firebase SDK.
        So we read from there — NOT the nested artifacts path.
        Path: /sessions/{session_id}
        """
        print(f"\n=== EVALUATION START ===")
        print(f"Looking for session_id: '{session_id}' in root /sessions/ collection")

        try:
            # 1. Read from the ROOT /sessions/ collection — where Unity actually saves
            doc_ref = self.db.collection("sessions").document(session_id)
            doc = doc_ref.get()

            if not doc.exists:
                # Log all existing session IDs to help debug any ID mismatch
                existing = [d.id for d in self.db.collection("sessions").stream()]
                print(f"Session NOT found. Existing session IDs: {existing}")
                raise ValueError(
                    f"Session '{session_id}' not found in /sessions/ collection. "
                    f"Available sessions: {existing}"
                )

            session_data = doc.to_dict()
            transcript = session_data.get("transcript", [])
            print(f"Session found! transcript length: {len(transcript)} entries")
            print(f"  simulation_type: {session_data.get('simulation_type')}")
            print(f"  user_id: {session_data.get('user_id')}")

            if not transcript:
                raise ValueError(
                    f"Transcript is empty for session '{session_id}'. "
                    "Make sure the user spoke to an AI character before clicking Finish."
                )

            # 2. Build rubric based on simulation type
            sim_type = session_data.get("simulation_type", "teacher")
            if sim_type == "doctor":
                rubric = """
                Evaluate the medical professional's performance:
                - Communication: Clear, calm, professional explanation to the patient.
                - Empathy: Did they acknowledge the patient's feelings and concerns?
                - Problem Solving: Did they ask the right diagnostic questions?
                - Accuracy: Did they reach the correct diagnosis or next steps?
                """
            elif sim_type == "lawyer":
                rubric = """
                Evaluate the judge/lawyer's courtroom performance:
                - Communication: Clarity, persuasion, and professionalism in the courtroom.
                - Empathy: Did they consider the perspectives of all parties involved?
                - Problem Solving: Did they apply logical legal reasoning to the case?
                - Courtroom Management: Did they maintain order and fairness throughout?
                """
            else:
                rubric = """
                Evaluate the teacher's classroom performance:
                - Communication: Clarity, tone, and professionalism with students.
                - Empathy: Did they acknowledge student feelings and concerns?
                - Problem Solving: Did they identify root causes of student issues?
                - Classroom Management: Did they handle the situation appropriately?
                """

            # 3. Call Gemini to grade the transcript
            print(
                f"Sending {len(transcript)} transcript entries to Gemini for evaluation..."
            )
            evaluation_json = await self.gemini.evaluate_transcript(transcript, rubric)
            print(f"Gemini evaluation complete: {evaluation_json}")

            # 4. Save the score to the root /scores/ collection.
            #    The Dashboard reads: score.skills (for radar) and score.totalScore (for avg).
            #    score_service.py (get_user_scores) reads these same fields.
            raw_scores = evaluation_json.get("scores", {})

            # Build the flat 'skills' dict — this is what Dashboard radarData maps over
            skills = {
                "Communication": raw_scores.get(
                    "communication", raw_scores.get("Communication", 0)
                ),
                "Empathy": raw_scores.get("empathy", raw_scores.get("Empathy", 0)),
                "Problem Solving": raw_scores.get(
                    "problem_solving",
                    raw_scores.get("logic", raw_scores.get("Problem Solving", 0)),
                ),
                "Classroom Management": raw_scores.get(
                    "classroom_management",
                    raw_scores.get("accuracy", raw_scores.get("Management", 0)),
                ),
            }

            total = evaluation_json.get("total_score", raw_scores.get("total_score", 0))

            score_ref = self.db.collection("scores").document(session_id)
            score_data = {
                # Fields score_service.py's Score model and get_user_scores return:
                "session_id": session_id,
                "sessionId": session_id,  # camelCase alias used in sessionHistory
                "user_id": session_data.get("user_id", "anonymous"),
                "simulation_type": sim_type,
                "skills": skills,  # ← Dashboard radarData reads this
                "totalScore": total,  # ← Dashboard averageScore uses totalScore
                "total_score": total,  # ← snake_case alias
                "feedback": evaluation_json.get("feedback", ""),
                "summary": evaluation_json.get("summary", ""),
                "created_at": firestore.SERVER_TIMESTAMP,
            }
            score_ref.set(score_data)
            print(f"Score saved to /scores/{session_id}")
            print(f"=== EVALUATION COMPLETE ===\n")

            return evaluation_json

        except Exception as e:
            print(f"=== EVALUATION FAILED: {str(e)} ===\n")
            raise e


evaluation_service = EvaluationService()
