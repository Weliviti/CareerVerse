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


def update_user(uid: str, updates: dict):
    """
    Updates a user profile in Firestore.

    Args:
        uid (str): The user's UID from Firebase Auth.
        updates (dict): Dictionary of fields to update.

    Returns:
        dict: Updated user data.

    Raises:
        Exception: If user does not exist.
    """
    db = get_db_client()

    # Get the user document reference
    user_ref = db.collection("users").document(uid)
    user_doc = user_ref.get()

    # Check if user exists
    if not user_doc.exists:
        raise Exception(f"User with UID {uid} does not exist")

    # Update the user document
    user_ref.update(updates)

    # Fetch and return the updated user data
    updated_doc = user_ref.get()
    return updated_doc.to_dict()
