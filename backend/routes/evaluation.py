from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.evaluation_service import evaluation_service
from utils.responses import success_response, error_response

router = APIRouter()


class EvaluationRequest(BaseModel):
    session_id: str


@router.post("/evaluate")
async def evaluate_session(request: EvaluationRequest):
    """
    Evaluates a simulation session based on the transcript and a rubric.

    This is a legacy endpoint that delegates to evaluation_service.
    The primary endpoint is POST /api/evaluate/session.
    """
    try:
        result = await evaluation_service.evaluate_session(request.session_id)
        return success_response(data=result, message="Session evaluated successfully")
    except ValueError as ve:
        return error_response(message=str(ve), status_code=404)
    except Exception as e:
        return error_response(message=f"Evaluation failed: {str(e)}", status_code=500)
