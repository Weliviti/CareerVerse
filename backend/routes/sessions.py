from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from services.session_service import session_service
from middleware.auth import verify_token
from utils.responses import success_response, error_response
from typing import Optional

router = APIRouter()


class StartSessionRequest(BaseModel):
    simulation_type: str = Field(
        ..., description="Type of simulation (e.g., 'doctor', 'teacher')"
    )


class StartSessionResponse(BaseModel):
    session_id: str
    status: str
    initial_message: Optional[str] = None


@router.post("/start", response_model=StartSessionResponse)
async def start_session(request: StartSessionRequest, user=Depends(verify_token)):
    """
    Start a new simulation session.
    """
    try:
        # User ID is available from the token verification
        user_id = user.get("uid")

        result = await session_service.start_session(
            user_id=user_id, simulation_type=request.simulation_type
        )

        return success_response(data=result, message="Session started successfully")
    except Exception as e:
        return error_response(
            message="Failed to start session", code=500, error_details=str(e)
        )
