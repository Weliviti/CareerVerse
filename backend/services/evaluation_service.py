import json
from firebase_admin import firestore
from services.firebase_admin_service import get_db_client
from services.gemini_service import GeminiService
from config import settings


class EvaluationService:
    def __init__(self):
        self._db = None
        self.gemini = GeminiService(purpose="evaluator")
        # Global appId for Firestore paths (Rule 1)
        self.app_id = "default-app-id"

    @property
    def db(self):
        if self._db is None:
            self._db = get_db_client()
        return self._db

    async def evaluate_session(self, session_id: str):
        """
        Fetches the transcript from the mandatory Firestore path and evaluates it.
        Path Rule 1: /artifacts/{appId}/public/data/sessions/{sessionId}
        """
        try:
            # 1. Fetch the transcript using Mandatory Path (Rule 1)
            doc_ref = (
                self.db.collection("artifacts")
                .document(self.app_id)
                .collection("public")
                .document("data")
                .collection("sessions")
                .document(session_id)
            )

            doc = doc_ref.get()

            if not doc.exists:
                raise ValueError(
                    f"Session {session_id} not found in database. Transcript must be saved during chat."
                )

            session_data = doc.to_dict()
            transcript = session_data.get("transcript", [])

            if not transcript:
                raise ValueError(f"No transcript data found for session {session_id}.")

            # 2. Define the Professional Rubric
            # We customize this slightly for the Doctor game
            rubric = """
            Evaluate the professional performance based on the transcript:
            - Communication: Clarity, professionalism, and tone.
            - Empathy: Did they acknowledge the patient/student's feelings?
            - Problem Solving: Did they identify the root cause or ask the right diagnostic questions?
            - Accuracy: Did they reach the correct conclusion or follow proper procedure?
            """

            # 3. Call Gemini to Judge
            evaluation_json = await self.gemini.evaluate_transcript(transcript, rubric)

            # 4. Save the score to the mandatory scores collection
            # Path Rule 1: /artifacts/{appId}/public/data/scores/{sessionId}
            score_ref = (
                self.db.collection("artifacts")
                .document(self.app_id)
                .collection("public")
                .document("data")
                .collection("scores")
                .document(session_id)
            )

            score_data = {
                "session_id": session_id,
                "user_id": session_data.get("user_id", "anonymous"),
                "simulation_type": session_data.get("simulation_type", "unknown"),
                "scores": evaluation_json["scores"],
                "total_score": evaluation_json["total_score"],
                "feedback": evaluation_json["feedback"],
                "created_at": firestore.SERVER_TIMESTAMP,
            }

            score_ref.set(score_data)

            return evaluation_json

        except Exception as e:
            print(f"Evaluation Error: {str(e)}")
            raise e


evaluation_service = EvaluationService()
