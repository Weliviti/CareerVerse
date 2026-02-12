from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.evaluation_service import evaluation_service
from utils.responses import success_response

router = APIRouter()


class EvaluateRequest(BaseModel):
    """Request model for session evaluation."""

    session_id: str


@router.post("/session")
async def evaluate_session(request: EvaluateRequest):
    """
    Evaluate a completed simulation session using AI.

    Delegates to evaluation_service.evaluate_session() which:
    1. Retrieves session transcript from Firestore.
    2. Identifies the simulation type (doctor/teacher).
    3. Loads the matching rubric from prompts/rubrics/.
    4. Sends transcript + rubric to Gemini for evaluation.
    5. Returns parsed JSON scores and feedback.

    Args:
        request: Contains session_id to evaluate.

    Returns:
        Success response with total_score, feedback, and session_id.
    """
    try:
        result = await evaluation_service.evaluate_session(request.session_id)
        return success_response(
            data=result,
            message="Session evaluated successfully",
        )
    except ValueError as e:
        status = 404 if "not found" in str(e).lower() else 400
        raise HTTPException(status_code=status, detail=str(e))
    except FileNotFoundError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Evaluation failed: {str(e)}")
