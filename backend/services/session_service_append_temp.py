def get_transcript(session_id: str) -> list:
    """
    Retrieves the transcript of a session.

    Args:
        session_id (str): The ID of the session document.

    Returns:
        list: The list of messages in the transcript.
    """
    try:
        session_ref = db.collection("sessions").document(session_id)
        session_doc = session_ref.get()

        if not session_doc.exists:
            raise ValueError(f"Session with ID {session_id} not found.")

        session_data = session_doc.to_dict()
        return session_data.get("transcript", [])

    except Exception as e:
        print(f"Error getting transcript for session {session_id}: {e}")
        raise e
