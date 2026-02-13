import json
import os

from services.gemini_service import GeminiService
from services.session_service import SessionService


class EvaluationService:
    """Service for evaluating simulation session transcripts using AI."""

    def __init__(self):
        """Initialize evaluation service with lazy-loaded dependencies."""
        self._session_service = None
        self._gemini_service = None
        self.rubrics_dir = os.path.join(
            os.path.dirname(os.path.dirname(__file__)), "prompts", "rubrics"
        )

    @property
    def session_service(self):
        """Lazy-load SessionService to avoid import-time Firestore init."""
        if self._session_service is None:
            self._session_service = SessionService()
        return self._session_service

    @property
    def gemini_service(self):
        """Lazy-load GeminiService to avoid import-time API key check."""
        if self._gemini_service is None:
            self._gemini_service = GeminiService()
        return self._gemini_service

    async def evaluate_session(self, session_id: str) -> dict:
        """
        Evaluate a completed simulation session.

        Steps:
            1. Get transcript from session_service.get_session(session_id).
            2. Identify simulation_type (doctor/teacher).
            3. Load matching rubric text from prompts/rubrics/.
            4. Call gemini_service.generate_response(prompt) with transcript + rubric.
            5. Return the JSON object (scores + feedback).

        Args:
            session_id: The ID of the session to evaluate.

        Returns:
            Dict containing total_score, feedback, and session_id.

        Raises:
            ValueError: If session not found or has no transcript.
            FileNotFoundError: If rubric file not found for the simulation type.
            RuntimeError: If AI evaluation response cannot be parsed.
        """
        # 1. Get session data
        session_data = await self.session_service.get_session(session_id)
        if not session_data:
            raise ValueError(f"Session {session_id} not found")

        # 2. Check transcript exists
        transcript = session_data.get("transcript", [])
        if not transcript:
            raise ValueError(f"Session {session_id} has no transcript to evaluate")

        # 3. Identify simulation type
        simulation_type = session_data.get("simulation_type", "doctor")

        # 4. Load matching rubric
        rubric_text = self._load_rubric(simulation_type)

        # 5. Format transcript and build prompt
        transcript_text = "\n".join(
            [f"{msg['role'].upper()}: {msg['message']}" for msg in transcript]
        )
        evaluation_prompt = rubric_text.replace("{{transcript}}", transcript_text)

        # 6. Call Gemini API
        evaluation_result = await self.gemini_service.generate_response(
            evaluation_prompt
        )

        # 7. Parse and return JSON
        evaluation_data = self._parse_evaluation_response(evaluation_result)

        return {
            "total_score": evaluation_data["total_score"],
            "feedback": evaluation_data["feedback"],
            "session_id": session_id,
        }

    def _load_rubric(self, simulation_type: str) -> str:
        """
        Load rubric text file for the given simulation type.

        Args:
            simulation_type: Type of simulation (e.g., 'doctor', 'teacher').

        Returns:
            The rubric text content.

        Raises:
            FileNotFoundError: If rubric file does not exist.
        """
        rubric_path = os.path.join(self.rubrics_dir, f"{simulation_type}.txt")
        try:
            with open(rubric_path, "r", encoding="utf-8") as f:
                return f.read()
        except FileNotFoundError:
            raise FileNotFoundError(
                f"Evaluation rubric not found for simulation type: {simulation_type}"
            )

    @staticmethod
    def _parse_evaluation_response(response_text: str) -> dict:
        """
        Parse the JSON evaluation response from Gemini.

        Handles responses wrapped in markdown code blocks.

        Args:
            response_text: Raw text response from Gemini.

        Returns:
            Parsed dict with total_score and feedback.

        Raises:
            RuntimeError: If JSON parsing fails or required fields are missing.
        """
        cleaned = response_text.strip()
        if cleaned.startswith("```json"):
            cleaned = cleaned[7:]
        if cleaned.startswith("```"):
            cleaned = cleaned[3:]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
        cleaned = cleaned.strip()

        try:
            data = json.loads(cleaned)
        except json.JSONDecodeError as e:
            raise RuntimeError(f"Failed to parse AI evaluation response: {e}")

        if "total_score" not in data or "feedback" not in data:
            raise RuntimeError(
                "AI evaluation response missing required fields: total_score, feedback"
            )

        return data


# Create global instance
evaluation_service = EvaluationService()
