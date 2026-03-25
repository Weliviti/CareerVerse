from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field
from services.session_service import session_service
from middleware.auth import verify_token
from utils.responses import success_response, error_response
from typing import Optional
from services.firebase_admin_service import get_db_client
from google.cloud.firestore_v1.base_query import FieldFilter

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


@router.post("/{session_id}/end")
async def end_session(session_id: str, user=Depends(verify_token)):
    """
    End an active simulation session.
    """
    try:
        # In a real scenario, you'd check if the session belongs to the user
        result = await session_service.end_session(session_id)
        return success_response(data=result, message="Session ended successfully")
    except ValueError as e:
        return error_response(message=str(e), code=404)
    except Exception as e:
        return error_response(
            message="Failed to end session", code=500, error_details=str(e)
        )


@router.get("/current")
async def get_current_session(user=Depends(verify_token)):
    """
    Returns the most recent active session for the authenticated user.
    No composite index required — we sort in Python after fetching.
    """
    try:
        uid = user.get("uid")
        db = get_db_client()

        # Fetch all active sessions for this user (no order_by = no index needed)
        results = list(
            db.collection("sessions")
            .where(filter=FieldFilter("user_id", "==", uid))
            .where(filter=FieldFilter("status", "==", "active"))
            .stream()
        )

        if not results:
            return error_response(
                message="No active session found for this user", code=404
            )

        # Sort by updated_at in Python (most recent first)
        def get_updated_at(doc):
            data = doc.to_dict()
            updated = data.get("updated_at")
            return updated if updated else ""

        results.sort(key=get_updated_at, reverse=True)
        doc = results[0]
        session_data = doc.to_dict()

        print(f"[SESSION/CURRENT] Found session {doc.id} for user {uid}")
        return success_response(
            data={
                "session_id": doc.id,
                "simulation_type": session_data.get("simulation_type"),
            },
            message="Current session found",
        )
    except Exception as e:
        print(f"[SESSION/CURRENT] Error: {e}")
        return error_response(
            message=f"Failed to get current session: {str(e)}", code=500
        )


@router.get("/user/{uid}")
async def get_user_sessions(
    uid: str,
    limit: int = Query(default=10, ge=1, le=50),
    cursor: Optional[str] = Query(default=None),
):
    """
    Get paginated sessions for a specific user.

    Args:
        uid: The user's Firebase UID.
        limit: Number of sessions to return (1-50, default 10).
        cursor: session_id for cursor-based pagination.

    Returns:
        Success response with sessions list and next_cursor.
    """
    try:
        result = await session_service.get_user_sessions(
            user_id=uid, limit=limit, cursor=cursor
        )
        return success_response(
            data=result, message="User sessions retrieved successfully"
        )
    except Exception as e:
        return error_response(
            message=f"Failed to retrieve sessions: {str(e)}", code=500
        )
