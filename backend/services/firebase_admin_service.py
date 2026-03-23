"""
Firebase Admin SDK Service
Handles Firestore database connection for the CareerVerse backend.

Supports two credential sources (checked in order):
  1. FIREBASE_CREDENTIALS_JSON env var (JSON string) — for Render / cloud
  2. FIREBASE_CREDENTIALS_PATH file path              — for local dev
"""

import firebase_admin
from firebase_admin import credentials, firestore, auth
import os
import json
import tempfile


def get_db_client():
    """
    Initialize Firebase Admin SDK and return Firestore client.

    Returns:
        firestore.Client: Firestore database client

    Raises:
        FileNotFoundError: If no credentials source is available
    """
    # Check if Firebase app is already initialized
    if not firebase_admin._apps:
        from config import settings

        cred = None

        # ── Option 1: JSON string from environment variable (Render / cloud) ──
        firebase_json = os.environ.get("FIREBASE_CREDENTIALS_JSON", "")
        if firebase_json:
            try:
                service_info = json.loads(firebase_json)
                cred = credentials.Certificate(service_info)
                print("✅ Firebase Admin SDK initialized from FIREBASE_CREDENTIALS_JSON env var")
            except Exception as e:
                print(f"⚠️  Failed to parse FIREBASE_CREDENTIALS_JSON: {e}")
                cred = None

        # ── Option 2: Local file path (local development) ──
        if cred is None:
            service_account_path = settings.FIREBASE_CREDENTIALS_PATH
            if os.path.exists(service_account_path):
                try:
                    cred = credentials.Certificate(service_account_path)
                    print("✅ Firebase Admin SDK initialized from local file")
                except Exception as e:
                    print(f"❌ Error loading service account file: {e}")
                    raise
            else:
                print(f"⚠️  WARNING: {service_account_path} not found!")
                print(
                    "Set FIREBASE_CREDENTIALS_JSON env var or add your service account JSON file."
                )
                raise FileNotFoundError(
                    "No Firebase credentials found. "
                    "Set FIREBASE_CREDENTIALS_JSON env var (for cloud) "
                    "or provide service-account.json file (for local dev)."
                )

        firebase_admin.initialize_app(cred)

    # Return Firestore client
    return firestore.client()
