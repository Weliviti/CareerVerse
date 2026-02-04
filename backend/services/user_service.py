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


def get_user_by_uid(uid: str):
    """
    Fetches a user profile from Firestore by UID.

    Args:
        uid (str): The user's UID from Firebase Auth.

    Returns:
        dict: User data (uid, email, name, role) or None if not found.
    """
    db = get_db_client()

    # Fetch user document from Firestore
    user_ref = db.collection("users").document(uid)
    user_doc = user_ref.get()

    if user_doc.exists:
        return user_doc.to_dict()
    else:
        return None
