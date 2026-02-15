"""
Script to set a user's role to 'admin' in Firestore.
Usage: python scripts/set_admin.py <email>
"""

import sys
import os

# Add parent directory to path so we can import services
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.firebase_admin_service import get_db_client


def set_admin_role(email: str):
    db = get_db_client()
    users_ref = db.collection("users")

    # Find user by email
    docs = users_ref.where("email", "==", email).stream()
    found = False
    for doc in docs:
        doc.reference.update({"role": "admin"})
        print(f"✅ User '{email}' (UID: {doc.id}) role updated to 'admin'")
        found = True

    if not found:
        print(f"❌ No user found with email: {email}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/set_admin.py <email>")
        sys.exit(1)

    email = sys.argv[1]
    set_admin_role(email)
