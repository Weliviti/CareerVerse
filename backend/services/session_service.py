from datetime import datetime
from google.cloud import firestore
from services.firebase_admin_service import get_db_client

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
