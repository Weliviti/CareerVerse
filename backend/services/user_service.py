from services.firebase_admin_service import get_db_client
from firebase_admin import firestore


def create_user_profile(uid: str, email: str, name: str):
    """
    Creates a user profile in the users collection.

    Args:
        uid (str): The user's UID from Firebase Auth.
        email (str): The user's email address.
        name (str): The user's display name.
    """
    db = get_db_client()

    user_data = {
        "uid": uid,
        "email": email,
        "name": name,
        "role": "student",
        "created_at": firestore.SERVER_TIMESTAMP,
    }

    # Write to users collection using the UID as the document ID
    db.collection("users").document(uid).set(user_data)

    return user_data
