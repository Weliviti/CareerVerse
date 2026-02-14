"""
Simulation launch routes for CareerVerse backend.

Provides the POST /launch endpoint to initialize a new simulation session.
"""

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from services.session_service import session_service
from middleware.auth import verify_token
from utils.responses import success_response, error_response

router = APIRouter()


class LaunchRequest(BaseModel):
    """Request model for launching a simulation."""

    simulation_type: str = Field(
        ..., description="Type of simulation: 'doctor', 'teacher', or 'lawyer'"
    )


@router.post("/launch")
async def launch_simulation(request: LaunchRequest, user=Depends(verify_token)):
    """
    Launch a new simulation session.

    Creates a new session via session_service and returns the session_id
    so the frontend/Unity client can connect.
    """
    try:
        user_id = user.get("uid")

        result = await session_service.start_session(
            user_id=user_id, simulation_type=request.simulation_type
        )

        return success_response(
            data={"session_id": result["session_id"]},
            message="Simulation launched successfully",
        )
    except Exception as e:
        return error_response(
            message="Failed to launch simulation",
            code=500,
            error_details=str(e),
        )
