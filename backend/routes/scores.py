from fastapi import APIRouter, Query
from typing import Optional

from services.score_service import score_service
from utils.responses import success_response, error_response

router = APIRouter()


@router.get("/user/{uid}")
async def get_user_scores(
    uid: str,
    limit: int = Query(default=10, ge=1, le=50),
    cursor: Optional[str] = Query(default=None),
):
    """
    Get paginated scores for a specific user.

    Args:
        uid: The user's Firebase UID.
        limit: Number of scores to return (1-50, default 10).
        cursor: score_id for cursor-based pagination.

    Returns:
        Success response with scores list and next_cursor.
    """
    try:
        result = await score_service.get_user_scores(
            uid=uid, limit=limit, cursor=cursor
        )
        return success_response(
            data=result, message="User scores retrieved successfully"
        )
    except Exception as e:
        return error_response(message=f"Failed to retrieve scores: {str(e)}", code=500)
