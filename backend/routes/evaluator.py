from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gemini_service import GeminiService
from services.session_service import SessionService
from utils.responses import success_response, error_response
import json
import os

router = APIRouter()
gemini_service = GeminiService()
session_service = SessionService()


class EvaluateRequest(BaseModel):
    """Request model for session evaluation."""

    session_id: str


@router.post("/session")
async def evaluate_session(request: EvaluateRequest):
    """
    Evaluate a completed simulation session using AI.

    Args:
        request: Contains session_id to evaluate

    Returns:
        Evaluation results with total_score and feedback

    Raises:
        HTTPException: If session not found or evaluation fails
    """
    try:
        # Retrieve session from Firestore
        session_data = await session_service.get_session(request.session_id)

        if not session_data:
            raise HTTPException(status_code=404, detail="Session not found")

        # Check if session has transcript
        transcript = session_data.get("transcript", [])
        if not transcript:
            raise HTTPException(
                status_code=400, detail="Session has no transcript to evaluate"
            )

        # Format transcript for evaluation
        transcript_text = "\n".join(
            [f"{msg['role'].upper()}: {msg['message']}" for msg in transcript]
        )

        # Load evaluation rubric based on simulation type
        simulation_type = session_data.get("simulation_type", "doctor")
        rubric_path = os.path.join("prompts", "rubrics", f"{simulation_type}.txt")

        try:
            with open(rubric_path, "r", encoding="utf-8") as f:
                rubric_template = f.read()
        except FileNotFoundError:
            raise HTTPException(
                status_code=500,
                detail=f"Evaluation rubric not found for {simulation_type}",
            )

        # Replace placeholder with actual transcript
        evaluation_prompt = rubric_template.replace("{{transcript}}", transcript_text)

        # Call Gemini API for evaluation
        evaluation_result = await gemini_service.generate_response(evaluation_prompt)

        # Parse JSON response from Gemini
        try:
            # Clean the response - remove markdown code blocks if present
            cleaned_result = evaluation_result.strip()
            if cleaned_result.startswith("```json"):
                cleaned_result = cleaned_result[7:]
            if cleaned_result.startswith("```"):
                cleaned_result = cleaned_result[3:]
            if cleaned_result.endswith("```"):
                cleaned_result = cleaned_result[:-3]
            cleaned_result = cleaned_result.strip()

            evaluation_data = json.loads(cleaned_result)

            # Validate required fields
            if (
                "total_score" not in evaluation_data
                or "feedback" not in evaluation_data
            ):
                raise ValueError("Missing required fields in evaluation response")

            return success_response(
                data={
                    "total_score": evaluation_data["total_score"],
                    "feedback": evaluation_data["feedback"],
                    "session_id": request.session_id,
                },
                message="Session evaluated successfully",
            )

        except (json.JSONDecodeError, ValueError) as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to parse AI evaluation response: {str(e)}",
            )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Evaluation failed: {str(e)}")
