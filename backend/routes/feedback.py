"""
Feedback Routes
Handles user feedback submission and storage
"""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from datetime import datetime
from services.firebase_admin_service import get_db_client
from middleware.auth import verify_token
from utils.responses import success_response, error_response

router = APIRouter(prefix="/feedback", tags=["feedback"])


class FeedbackRequest(BaseModel):
    """User feedback submission"""

    name: str = Field(..., min_length=2, max_length=100)
    message: str = Field(..., min_length=10, max_length=1000)


@router.post("")
async def submit_feedback(
    feedback: FeedbackRequest, token_data: dict = Depends(verify_token)
):
    """
    Submit user feedback

    Requires authentication. Stores feedback in Firestore and optionally sends email.

    Args:
        feedback: FeedbackRequest with name and message
        token_data: Decoded token from auth middleware

    Returns:
        Success response confirming feedback submission
    """
    try:
        db = get_db_client()
        uid = token_data.get("uid")
        user_email = token_data.get("email", "unknown")

        # Create feedback document
        feedback_data = {
            "uid": uid,
            "user_email": user_email,
            "name": feedback.name,
            "message": feedback.message,
            "timestamp": datetime.utcnow(),
            "status": "new",  # new, read, responded
        }

        # Store in Firestore
        feedback_ref = db.collection("feedback").add(feedback_data)

        # TODO: Optionally send email notification to careerverselk@gmail.com
        # This requires SMTP configuration or email service integration

        return success_response(
            message="Thank you for your feedback! We'll review it soon.",
            data={"id": feedback_ref[1].id},
        )

    except Exception as e:
        print(f"Error submitting feedback: {str(e)}")
        raise HTTPException(
            status_code=500, detail="Failed to submit feedback. Please try again later."
        )
