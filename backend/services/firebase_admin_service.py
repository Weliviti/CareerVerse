"""
Firebase Admin SDK Service
Handles Firestore database connection for the CareerVerse backend.
"""

import firebase_admin
from firebase_admin import credentials, firestore
import os


def get_db_client():
    """
    Initialize Firebase Admin SDK and return Firestore client.

    Returns:
        firestore.Client: Firestore database client

    Raises:
        FileNotFoundError: If service-account.json is missing
    """
    # Check if Firebase app is already initialized
    if not firebase_admin._apps:
        # Path to service account JSON file
        service_account_path = "service-account.json"

        # Check if the service account file exists
        if not os.path.exists(service_account_path):
            print("⚠️  WARNING: service-account.json not found!")
            print(
                "Please add your Firebase service account JSON file to the backend directory."
            )
            print(
                "You can download it from: Firebase Console > Project Settings > Service Accounts"
            )
            raise FileNotFoundError(
                "service-account.json is missing. Please add your Firebase service account credentials."
            )

        try:
            # Initialize Firebase Admin SDK
            cred = credentials.Certificate(service_account_path)
            firebase_admin.initialize_app(cred)
            print("✅ Firebase Admin SDK initialized successfully!")
        except Exception as e:
            print(f"❌ Error initializing Firebase Admin SDK: {e}")
            raise

    # Return Firestore client
    return firestore.client()
