from datetime import datetime, timezone
from google.cloud import firestore
from backend.services.firebase_admin_service import get_db_client
from backend.models.session import Session

db = get_db_client()


def append_message(session_id: str, role: str, content: str):
    """
    Appends a new message to the transcript of a session.

    Args:
        session_id (str): The ID of the session document.
        role (str): The role of the message sender (e.g., 'user', 'model').
        content (str): The content of the message.

    Returns:
        None
    """
    try:
        session_ref = db.collection("sessions").document(session_id)

        # Verify session exists
        session_doc = session_ref.get()
        if not session_doc.exists:
            raise ValueError(f"Session with ID {session_id} not found.")

        new_message = {"role": role, "content": content, "timestamp": datetime.now()}

        session_ref.update({"transcript": firestore.ArrayUnion([new_message])})

        print(f"Message appended to session {session_id}")

    except Exception as e:
        print(f"Error appending message to session {session_id}: {e}")
        raise e


def end_session(session_id: str):
    """
    Ends a simulation session, calculates duration, and updates status in Firestore.

    Args:
        session_id (str): The ID of the session to end.

    Returns:
        dict: The updated session data.

    Raises:
        ValueError: If session is not found or already completed.
        Exception: If there's an error interacting with Firestore.
    """
    try:
        session_ref = db.collection("sessions").document(session_id)
        session_doc = session_ref.get()

        if not session_doc.exists:
            raise ValueError(f"Session with ID {session_id} not found.")

        session_data = session_doc.to_dict()

        if session_data.get("status") == "completed":
            # Just return current data if already completed
            return session_data

        # Calculate duration
        start_time = session_data.get("start_time")

        if isinstance(start_time, datetime):
            start_dt = start_time
        elif isinstance(start_time, str):
            try:
                start_dt = datetime.fromisoformat(start_time.replace("Z", "+00:00"))
            except ValueError:
                raise ValueError(f"Invalid start_time format in session {session_id}")
        else:
            if hasattr(start_time, "to_datetime"):
                start_dt = start_time.to_datetime()
            else:
                raise ValueError(f"Unknown start_time type: {type(start_time)}")

        if start_dt.tzinfo is None:
            start_dt = start_dt.replace(tzinfo=timezone.utc)

        now = datetime.now(timezone.utc)
        duration_delta = now - start_dt
        duration_minutes = int(duration_delta.total_seconds() / 60)

        update_data = {
            "status": "completed",
            "end_time": now,
            "duration": duration_minutes,
        }

        session_ref.update(update_data)
        session_data.update(update_data)

        return session_data

    except Exception as e:
        print(f"Error ending session {session_id}: {e}")
        raise e
