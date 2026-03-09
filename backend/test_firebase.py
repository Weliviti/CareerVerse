"""
Test script for Firebase Admin SDK service
Run this to verify the Firebase connection is working.
"""

from services.firebase_admin_service import get_db_client


def test_firebase_connection():
    """Test Firebase Admin SDK initialization and Firestore connection."""
    try:
        print("Testing Firebase Admin SDK...")
        print("-" * 50)

        # Get Firestore client
        db = get_db_client()

        print("✅ Successfully connected to Firestore!")
        print(f"Database client: {db}")

        # Try to list collections (this will show if connection works)
        collections = list(db.collections())
        print(f"\n📚 Available collections: {len(collections)}")
        for collection in collections:
            print(f"  - {collection.id}")

        print("\n🎉 Firebase Admin SDK is working correctly!")
        return True

    except FileNotFoundError as e:
        print(f"\n❌ Error: {e}")
        return False
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        return False


if __name__ == "__main__":
    test_firebase_connection()
