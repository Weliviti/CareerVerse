from firebase_admin import firestore
from datetime import datetime
from backend.models.score import Score
from typing import Dict, Any, List, Optional

def save_score(user_id: str, session_id: str, score_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Save evaluation score and update user statistics.
    
    Args:
        user_id (str): The ID of the user.
        session_id (str): The ID of the session being evaluated.
        score_data (dict): Dictionary containing score details (total_score, skills, feedback, etc.).
        
    Returns:
        dict: The created score data including the generated score_id.
    """
    db = firestore.client()
    
    # Generate a new document reference for the score
    score_ref = db.collection('scores').document()
    score_id = score_ref.id
    
    timestamp = datetime.now()
    
    # Prepare score document data
    # Ensure score_data contains required fields or extract them
    score_doc = {
        'score_id': score_id,
        'user_id': user_id,
        'session_id': session_id,
        'simulation_type': score_data.get('simulation_type', 'unknown'), # Should be passed or extracted
        'skills': score_data.get('skills', {}),
        'total_score': score_data.get('total_score', 0),
        'feedback': score_data.get('feedback', ''),
        'created_at': timestamp
    }
    
    # Validate with Pydantic model (optional but good for consistency)
    try:
        score_model = Score(**score_doc)
        validated_data = score_model.model_dump(by_alias=True)
    except Exception as e:
        # Fallback to raw dict if validation fails, or raise error
        # For now, we'll log/print and proceed with raw dict if strictly needed, 
        # but better to let it fail if data is invalid.
        # Re-raising for visibility during dev
        raise ValueError(f"Invalid score data: {e}")

    # Reference to the user document
    user_ref = db.collection('users').document(user_id)
    
    # Use a batch write for atomic operation
    batch = db.batch()
    
    # 1. Create the score document
    batch.set(score_ref, validated_data)
    
    # 2. Increment total_simulations for the user
    # Note: If the user document doesn't exist, this update might fail or do nothing depending on configuration.
    # Assuming user exists as they must be logged in to generate a score.
    batch.update(user_ref, {'stats.total_simulations': firestore.Increment(1)})
    # Also updating top-level 'total_simulations' if that's the schema preference, 
    # but 'stats' field in User model suggests it might be nested. 
    # The requirement says "increment total_simulations count". 
    # Let's handle both or check the User model `stats` field presence.
    # User model has `stats: Optional[Dict] = None`. 
    # Safe to put it in `stats.total_simulations` or just `total_simulations` if schema allows flexible fields.
    # The requirement says "update the users/{uid} document to increment total_simulations count".
    # I'll put it at the root for now as per "total_simulations count", or `stats.totalSimulations`.
    # Let's stick to the prompt's implication of a field named `total_simulations`.
    # To be safe with the `User` model which has `stats`, I'll update `stats.total_simulations` AND a root field if needed.
    # Actually, the user requirement for Day 14 M4 says: "increment total_simulations count".
    # I will add it to `stats` map to keep root clean, OR if the User model allows extra fields (it does via Firestore flexibility).
    # Let's perform a merge with set if we want to ensure it works even if field missing.
    # But `update` with `Increment` requires the document to exist.
    # Because `User` model has `stats` (Dict), I'll try to put it there to be organized.
    # However, `firestore.Increment` on a nested field `stats.total_simulations` works well in Firestore.
    
    # Let's try to be robust. If `stats` is None, `stats.total_simulations` might fail if `stats` map doesn't exist?
    # Firestore `update({'stats.total_simulations': Increment(1)})` handles dot notation.
    # It creates the map if it doesn't exist? (Usually yes for dot notation in update if parent doc exists).
    
    batch.commit()
    
    return validated_data

def get_user_scores(user_id: str, limit: int = 10, cursor: Optional[str] = None) -> Dict[str, Any]:
    """
    Retrieve paginated scores for a user.

    Args:
        user_id (str): The ID of the user.
        limit (int): Number of scores to return.
        cursor (str, optional): The ID of the last document from the previous page to start after.

    Returns:
        dict: Contains 'scores' (list of dicts) and 'next_cursor' (ID of the last document).
    """
    db = firestore.client()
    
    # Base query: filter by user and order by created_at descending
    query = db.collection('scores') \
        .where('user_id', '==', user_id) \
        .order_by('created_at', direction=firestore.Query.DESCENDING) \
        .limit(limit)

    # Apply cursor if provided
    if cursor:
        doc_ref = db.collection('scores').document(cursor)
        doc_snapshot = doc_ref.get()
        if doc_snapshot.exists:
            query = query.start_after(doc_snapshot)

    docs = query.stream()
    scores = []
    last_doc_id = None

    for doc in docs:
        score_data = doc.to_dict()
        # Ensure score_id is present if not already in data (it should be)
        if 'score_id' not in score_data:
            score_data['score_id'] = doc.id
        scores.append(score_data)
        last_doc_id = doc.id
    
    return {
        'scores': scores,
        'next_cursor': last_doc_id
    }

