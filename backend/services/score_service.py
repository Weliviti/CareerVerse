from typing import Dict, List, Any, Optional
from datetime import datetime
from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter
from services.firebase_admin_service import get_db_client
from models.score import Score


class ScoreService:
    """Service for querying and saving user scores."""

    def __init__(self):
        """Initialize score service with lazy-loaded Firestore reference."""
        self._db = None

    @property
    def db(self):
        """Lazy-load Firestore client."""
        if self._db is None:
            self._db = get_db_client()
        return self._db

    @property
    def scores_ref(self):
        """Lazy-load Firestore scores collection reference."""
        return self.db.collection("scores")

    def save_score(
        self, user_id: str, session_id: str, score_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Save evaluation score and update user statistics.
        """
        # Generate a new document reference
        score_ref = self.scores_ref.document()
        score_id = score_ref.id
        timestamp = datetime.now()

        # Prepare score document data
        score_doc = {
            "score_id": score_id,
            "user_id": user_id,
            "session_id": session_id,
            "simulation_type": score_data.get("simulation_type", "unknown"),
            "skills": score_data.get("skills", {}),
            "total_score": score_data.get("total_score", 0),
            "feedback": score_data.get("feedback", ""),
            "created_at": timestamp,
        }

        # Validate with Pydantic model
        try:
            score_model = Score(**score_doc)
            validated_data = score_model.model_dump(by_alias=True)
        except Exception as e:
            raise ValueError(f"Invalid score data: {e}")

        # Reference to the user document
        user_ref = self.db.collection("users").document(user_id)

        # Use a batch write for atomic operation
        batch = self.db.batch()

        # 1. Create the score document
        batch.set(score_ref, validated_data)

        # 2. Increment total_simulations for the user
        # We use set with merge=True to ensure it creates the stats field if missing
        batch.set(
            user_ref,
            {"stats": {"total_simulations": firestore.Increment(1)}},
            merge=True,
        )

        batch.commit()

        return validated_data

    async def get_user_scores(
        self,
        uid: str,
        limit: int = 10,
        cursor: Optional[str] = None,
    ) -> Dict:
        """
        Get paginated scores for a user, ordered by newest first.
        """
        query_with_order = (
            self.scores_ref.where(filter=FieldFilter("user_id", "==", uid))
            .order_by("created_at", direction="DESCENDING")
            .limit(limit)
        )

        # Apply cursor-based pagination
        if cursor:
            cursor_doc = self.scores_ref.document(cursor).get()
            if cursor_doc.exists:
                query_with_order = query_with_order.start_after(cursor_doc)

        try:
            docs = query_with_order.stream()
            # Force generator execution to catch missing index error immediately
            docs_list = list(docs)
        except Exception:
            print(f"Warning: Missing index for user {uid} scores. Falling back to unordered query.")
            # Fallback if composite index is not available
            query_unordered = self.scores_ref.where(
                filter=FieldFilter("user_id", "==", uid)
            ).limit(limit)
            
            if cursor:
                cursor_doc = self.scores_ref.document(cursor).get()
                if cursor_doc.exists:
                    query_unordered = query_unordered.start_after(cursor_doc)
                    
            docs_list = list(query_unordered.stream())

        scores: List[Dict] = []

        for doc in docs_list:
            score_data = doc.to_dict()
            # Convert Firestore timestamps to ISO strings for JSON
            if "created_at" in score_data and hasattr(
                score_data["created_at"], "isoformat"
            ):
                score_data["created_at"] = score_data["created_at"].isoformat()
            scores.append(score_data)

        # Determine next_cursor
        next_cursor = scores[-1]["score_id"] if len(scores) == limit else None

        return {"scores": scores, "next_cursor": next_cursor}


# Create global instance
score_service = ScoreService()
