from fastapi import APIRouter
from services.score_service import score_service
from services.gemini_service import GeminiService
from utils.responses import success_response, error_response

router = APIRouter()
gemini_svc = GeminiService(purpose="career_recommendations")

@router.get("/user/{uid}")
async def get_career_recommendations(uid: str):
    """
    Get AI-generated career recommendations based on the user's score history.
    """
    try:
        # Fetch user scores (get up to 20 recent scores for context)
        result = await score_service.get_user_scores(uid=uid, limit=20)
        scores = result.get("scores", [])
        
        # Generate recommendations using Gemini
        recommendations = await gemini_svc.generate_career_recommendations(scores)
        
        return success_response(
            data=recommendations,
            message="Career recommendations generated successfully"
        )
    except Exception as e:
        import traceback
        traceback.print_exc()
        return error_response(message=f"Failed to generate recommendations: {str(e)}", code=500)
