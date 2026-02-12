<<<<<<< feature/D13-M6-Evaluator
from datetime import datetime
from typing import Dict, Optional
from services.firebase_admin_service import db
from models.session import Session
import uuid


class SessionService:
    """Service for managing simulation sessions in Firestore."""

    def __init__(self):
        """Initialize session service with Firestore database reference."""
        self.sessions_ref = db.collection("sessions")

    async def start_session(
        self, user_id: str, simulation_type: str
    ) -> Dict[str, str]:
        """
        Create a new simulation session.

        Args:
            user_id: The ID of the user starting the session
            simulation_type: Type of simulation (e.g., 'doctor', 'teacher', 'lawyer')

        Returns:
            Dict containing session_id and status

        Raises:
            Exception: If session creation fails
        """
        try:
            session_id = f"session_{uuid.uuid4().hex[:12]}"

            session_data = {
                "session_id": session_id,
                "user_id": user_id,
                "simulation_type": simulation_type,
                "start_time": datetime.utcnow(),
                "end_time": None,
                "status": "active",
                "transcript": [],
            }

            # Create session document in Firestore
            self.sessions_ref.document(session_id).set(session_data)

            return {"session_id": session_id, "status": "active"}

        except Exception as e:
            raise Exception(f"Failed to create session: {str(e)}")

    async def end_session(self, session_id: str) -> Dict[str, any]:
        """
        Mark a session as completed and calculate duration.

        Args:
            session_id: The ID of the session to end

        Returns:
            Dict containing session_id, status, and duration in minutes

        Raises:
            Exception: If session not found or update fails
        """
        try:
            session_doc = self.sessions_ref.document(session_id).get()

            if not session_doc.exists:
                raise ValueError(f"Session {session_id} not found")

            session_data = session_doc.to_dict()
            end_time = datetime.utcnow()

            # Calculate duration in minutes
            start_time = session_data.get("start_time")
            if isinstance(start_time, datetime):
                duration = (end_time - start_time).total_seconds() / 60
            else:
                duration = 0

            # Update session
            self.sessions_ref.document(session_id).update(
                {"end_time": end_time, "status": "completed"}
            )

            return {
                "session_id": session_id,
                "status": "completed",
                "duration": round(duration, 2),
            }

        except ValueError as ve:
            raise ve
        except Exception as e:
            raise Exception(f"Failed to end session: {str(e)}")

    async def append_transcript(
        self, session_id: str, role: str, message: str
    ) -> Dict[str, str]:
        """
        Add a message to the session transcript.

        Args:
            session_id: The ID of the session
            role: The role of the speaker ('user' or 'npc')
            message: The message content

        Returns:
            Dict containing success status

        Raises:
            Exception: If session not found or update fails
        """
        try:
            session_doc = self.sessions_ref.document(session_id).get()

            if not session_doc.exists:
                raise ValueError(f"Session {session_id} not found")

            # Append message to transcript array
            from google.cloud.firestore import ArrayUnion

            self.sessions_ref.document(session_id).update(
                {"transcript": ArrayUnion([{"role": role, "message": message}])}
            )

            return {"status": "success", "message": "Transcript updated"}

        except ValueError as ve:
            raise ve
        except Exception as e:
            raise Exception(f"Failed to append transcript: {str(e)}")

    async def get_session(self, session_id: str) -> Optional[Dict]:
        """
        Retrieve a session by ID.

        Args:
            session_id: The ID of the session to retrieve

        Returns:
            Session data as dictionary, or None if not found

        Raises:
            Exception: If retrieval fails
        """
        try:
            session_doc = self.sessions_ref.document(session_id).get()

            if not session_doc.exists:
                return None

            return session_doc.to_dict()

        except Exception as e:
            raise Exception(f"Failed to retrieve session: {str(e)}")
=======
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
>>>>>>> develop
