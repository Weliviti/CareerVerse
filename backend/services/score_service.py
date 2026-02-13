from typing import Dict, List, Optional

from services.firebase_admin_service import get_db_client


class ScoreService:
    """Service for querying user scores from Firestore."""

    def __init__(self):
        """Initialize score service with lazy-loaded Firestore reference."""
        self._db = None

    @property
    def scores_ref(self):
        """Lazy-load Firestore scores collection reference."""
        if self._db is None:
            self._db = get_db_client()
        return self._db.collection("scores")

    async def get_user_scores(
        self,
        uid: str,
        limit: int = 10,
        cursor: Optional[str] = None,
    ) -> Dict:
        """
        Get paginated scores for a user, ordered by newest first.

        Args:
            uid: The user's Firebase UID.
            limit: Maximum number of scores to return (default 10).
            cursor: score_id of the last item from the previous page.

        Returns:
            Dict with 'scores' list and 'next_cursor' (str or None).
        """
        query = (
            self.scores_ref.where("user_id", "==", uid)
            .order_by("created_at", direction="DESCENDING")
            .limit(limit)
        )

        # Apply cursor-based pagination
        if cursor:
            cursor_doc = self.scores_ref.document(cursor).get()
            if cursor_doc.exists:
                query = query.start_after(cursor_doc)

        docs = query.stream()
        scores: List[Dict] = []

        for doc in docs:
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
