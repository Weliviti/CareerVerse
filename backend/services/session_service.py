"""
Session Service for CareerVerse
Handles creation and management of simulation sessions in Firestore.
"""

import random
from datetime import datetime
from typing import Dict, List, Optional
from firebase_admin import firestore
from services.firebase_admin_service import get_db_client


# Persona variants for each simulation type
PERSONA_VARIANTS = {
    "doctor": [
        "patient_anxious",
        "patient_hiding",
        "patient_elderly",
    ],
    "teacher": [
        "student_disruptor",
        "student_quiet",
        "student_bored",
    ],
    "lawyer": [
        "client_nervous",
        "client_demanding",
        "client_confused",
    ],
}


def start_session(user_id: str, sim_type: str) -> str:
    """
    Create a new simulation session in Firestore.

    This function:
    1. Validates the simulation type
    2. Randomly selects a persona variant for the simulation
    3. Creates a new session document in the 'sessions' collection
    4. Returns the auto-generated session ID

    Args:
        user_id (str): The UID of the user starting the session
        sim_type (str): Type of simulation ("doctor", "teacher", or "lawyer")

    Returns:
        str: The auto-generated session_id

    Raises:
        ValueError: If sim_type is not valid
        Exception: If Firestore operation fails

    Example:
        >>> session_id = start_session("user_123", "doctor")
        >>> print(session_id)  # "sess_abc123xyz"
    """
    # Validate simulation type
    if sim_type not in PERSONA_VARIANTS:
        raise ValueError(
            f"Invalid simulation type: {sim_type}. "
            f"Must be one of: {list(PERSONA_VARIANTS.keys())}"
        )

    # Generate random persona variant for this simulation type
    persona_variant = random.choice(PERSONA_VARIANTS[sim_type])

    # Get Firestore client
    db = get_db_client()

    # Prepare session data
    session_data = {
        "userId": user_id,
        "simulationType": sim_type,
        "personaVariant": persona_variant,
        "startTime": firestore.SERVER_TIMESTAMP,
        "status": "active",
        "transcript": [],
    }

    # Create session document (Firestore auto-generates the ID)
    session_ref = db.collection("sessions").add(session_data)

    # Extract the session ID from the document reference
    # session_ref is a tuple: (timestamp, DocumentReference)
    session_id = session_ref[1].id

    return session_id


def end_session(session_id: str) -> Dict:
    """
    Mark a session as completed and set the end time.

    Args:
        session_id (str): The session ID to end

    Returns:
        dict: Updated session data

    Raises:
        Exception: If session not found or update fails
    """
    db = get_db_client()

    # Get session reference
    session_ref = db.collection("sessions").document(session_id)
    session_doc = session_ref.get()

    # Check if session exists
    if not session_doc.exists:
        raise Exception(f"Session {session_id} not found")

    # Update session status and end time
    session_ref.update(
        {
            "status": "completed",
            "endTime": firestore.SERVER_TIMESTAMP,
        }
    )

    # Return updated session data
    updated_doc = session_ref.get()
    return updated_doc.to_dict()


def append_transcript(session_id: str, role: str, message: str) -> None:
    """
    Append a message to the session transcript.

    Args:
        session_id (str): The session ID
        role (str): Either "user" or "npc"
        message (str): The message content

    Raises:
        Exception: If session not found or update fails
    """
    db = get_db_client()

    # Get session reference
    session_ref = db.collection("sessions").document(session_id)
    session_doc = session_ref.get()

    # Check if session exists
    if not session_doc.exists:
        raise Exception(f"Session {session_id} not found")

    # Create message object
    message_obj = {"role": role, "message": message, "timestamp": datetime.utcnow()}

    # Append to transcript array
    session_ref.update({"transcript": firestore.ArrayUnion([message_obj])})


def get_session(session_id: str) -> Optional[Dict]:
    """
    Retrieve a session by ID.

    Args:
        session_id (str): The session ID to retrieve

    Returns:
        dict: Session data or None if not found
    """
    db = get_db_client()

    session_ref = db.collection("sessions").document(session_id)
    session_doc = session_ref.get()

    if session_doc.exists:
        session_data = session_doc.to_dict()
        session_data["sessionId"] = session_id  # Include the ID in the response
        return session_data
    else:
        return None


def get_user_sessions(user_id: str, limit: int = 10) -> List[Dict]:
    """
    Get all sessions for a specific user.

    Args:
        user_id (str): The user ID
        limit (int): Maximum number of sessions to return (default: 10)

    Returns:
        list: List of session dictionaries
    """
    db = get_db_client()

    # Query sessions by userId, ordered by startTime descending
    sessions_query = (
        db.collection("sessions")
        .where("userId", "==", user_id)
        .order_by("startTime", direction=firestore.Query.DESCENDING)
        .limit(limit)
    )

    sessions = []
    for doc in sessions_query.stream():
        session_data = doc.to_dict()
        session_data["sessionId"] = doc.id
        sessions.append(session_data)

    return sessions
