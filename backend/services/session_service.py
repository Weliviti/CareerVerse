from datetime import datetime
from typing import Dict, Optional, List
from google.cloud.firestore_v1.base_query import FieldFilter
from services.firebase_admin_service import get_db_client
from models.session import Session
import uuid
import traceback


class SessionService:
    """Service for managing simulation sessions in Firestore."""

    def __init__(self):
        """Initialize session service with Firestore database reference."""
        self._db = None

    @property
    def sessions_ref(self):
        """Lazy-load Firestore sessions collection reference."""
        if self._db is None:
            self._db = get_db_client()
        return self._db.collection("sessions")

    async def start_session(self, user_id: str, simulation_type: str) -> Dict[str, str]:
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

    async def get_user_sessions(
        self, user_id: str, limit: int = 10, cursor: Optional[str] = None
    ) -> Dict:
        """
        Retrieve all sessions for a specific user with pagination.

        Args:
            user_id: The ID of the user
            limit: Maximum number of sessions to return
            cursor: Session ID for cursor-based pagination

        Returns:
            Dict containing sessions list and next_cursor

        Raises:
            Exception: If retrieval fails
        """
        try:
            query_with_order = (
                self.sessions_ref.where(filter=FieldFilter("user_id", "==", user_id))
                .order_by("start_time", direction="DESCENDING")
                .limit(limit)
            )

            # Apply cursor if provided
            if cursor:
                cursor_doc = self.sessions_ref.document(cursor).get()
                if cursor_doc.exists:
                    query_with_order = query_with_order.start_after(cursor_doc)

            # Execute query with fallback for missing index
            try:
                docs = query_with_order.stream()
                docs_list = list(docs)
            except Exception:
                print(
                    f"Warning: Missing index for user {user_id} sessions. Falling back to unordered query."
                )
                query_unordered = self.sessions_ref.where(
                    filter=FieldFilter("user_id", "==", user_id)
                ).limit(limit)

                if cursor:
                    cursor_doc = self.sessions_ref.document(cursor).get()
                    if cursor_doc.exists:
                        query_unordered = query_unordered.start_after(cursor_doc)

                docs_list = list(query_unordered.stream())

            sessions = []
            last_doc = None

            def make_serializable(obj):
                if hasattr(obj, "isoformat"):
                    return obj.isoformat()
                elif isinstance(obj, dict):
                    return {k: make_serializable(v) for k, v in obj.items()}
                elif isinstance(obj, list):
                    return [make_serializable(v) for v in obj]
                else:
                    return obj

            for doc in docs_list:
                session_data = doc.to_dict()
                session_data["id"] = doc.id
                session_data = make_serializable(session_data)
                sessions.append(session_data)
                last_doc = doc

            # Determine next cursor
            next_cursor = last_doc.id if last_doc and len(sessions) == limit else None

            return {"sessions": sessions, "next_cursor": next_cursor}

        except Exception as e:
            raise Exception(f"Failed to retrieve user sessions: {str(e)}")


# Create global instance
session_service = SessionService()


# Helper function for evaluation service
async def get_transcript(session_id: str) -> List[Dict]:
    """Retrieve transcript for a session."""
    session = await session_service.get_session(session_id)
    if session and "transcript" in session:
        return session["transcript"]
    return []
