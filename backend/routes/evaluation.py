from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from services.gemini_service import GeminiService
from services.session_service import get_transcript
from utils.responses import success_response, error_response

router = APIRouter()
gemini_service = GeminiService()

# Placeholder for Doctor Rubric (since file was missing)
DOCTOR_RUBRIC = """
You are a Senior Medical Examiner evaluating a student's patient consultation.

RUBRIC:
1. INTRODUCTION (10 points)
   - Did they introduce themselves? (5 pts)
   - Did they explain their role? (5 pts)

2. PATIENT HISTORY (20 points)
   - Asked about current symptoms (10 pts)
   - Asked about medical history (10 pts)

3. EMPATHY & COMMUNICATION (30 points)
   - Used empathetic language (10 pts)
   - Active listening verified (10 pts)
   - Clear explanations (10 pts)

4. DIAGNOSIS & PLAN (40 points)
   - Correctly identified the issue (20 pts)
   - Proposed reasonable next steps (20 pts)
"""


class EvaluationRequest(BaseModel):
    session_id: str


@router.post("/evaluate")
async def evaluate_session(request: EvaluationRequest):
    """
    Evaluates a simulation session based on the transcript and a rubric.
    """
    try:
        # 1. Get transcript
        transcript = get_transcript(request.session_id)
        if not transcript:
            return error_response(
                message="Session transcript not found or empty", status_code=404
            )

        # 2. Evaluate using Gemini
        # TODO: In future, select rubric based on session type. For now using Doctor Rubric default.
        evaluation_result = await gemini_service.evaluate_transcript(
            transcript, DOCTOR_RUBRIC
        )

        return success_response(
            data=evaluation_result, message="Session evaluated successfully"
        )

    except ValueError as ve:
        return error_response(message=str(ve), status_code=404)
    except Exception as e:
        return error_response(message=f"Evaluation failed: {str(e)}", status_code=500)
