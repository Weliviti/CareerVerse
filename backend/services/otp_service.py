"""
OTP Service for CareerVerse 2FA.

Handles generation, hashing, storage, verification, and invalidation
of one-time passwords using Firestore.
"""

import hashlib
import secrets
from datetime import datetime, timedelta, timezone
from services.firebase_admin_service import get_db_client


# ─── Constants ───
OTP_LENGTH = 6
OTP_EXPIRY_MINUTES = 10
MAX_VERIFY_ATTEMPTS = 5


def generate_otp() -> str:
    """Generate a cryptographically random 6-digit OTP code."""
    code = "".join([str(secrets.randbelow(10)) for _ in range(OTP_LENGTH)])
    return code


def hash_otp(code: str) -> str:
    """
    Hash an OTP code using SHA-256.

    Args:
        code: The raw 6-digit OTP string.

    Returns:
        The hex digest of the SHA-256 hash.
    """
    return hashlib.sha256(code.encode("utf-8")).hexdigest()


def store_otp(uid: str, otp_hash: str, purpose: str = "login") -> None:
    """
    Store a hashed OTP in Firestore for a user.

    Overwrites any existing OTP for this user (only latest is valid).

    Args:
        uid: The user's Firebase UID.
        otp_hash: SHA-256 hash of the OTP code.
        purpose: Either "login" or "setup".
    """
    db = get_db_client()

    now = datetime.now(timezone.utc)
    expires_at = now + timedelta(minutes=OTP_EXPIRY_MINUTES)

    otp_data = {
        "uid": uid,
        "otp_hash": otp_hash,
        "created_at": now.isoformat(),
        "expires_at": expires_at.isoformat(),
        "attempts": 0,
        "used": False,
        "purpose": purpose,
    }

    # Use uid as doc ID so each user has only one active OTP
    db.collection("otp_codes").document(uid).set(otp_data)
    print(f"✅ OTP stored for user {uid} (purpose: {purpose}, expires: {expires_at.isoformat()})")


def verify_otp(uid: str, submitted_code: str, expected_purpose: str = "login") -> dict:
    """
    Verify a submitted OTP code against the stored hash.

    Args:
        uid: The user's Firebase UID.
        submitted_code: The 6-digit code the user entered.
        expected_purpose: The expected purpose ("login" or "setup").

    Returns:
        A dict with:
            - verified (bool): Whether the code is correct and valid.
            - error (str|None): Error message if verification failed.
    """
    db = get_db_client()

    otp_ref = db.collection("otp_codes").document(uid)
    otp_doc = otp_ref.get()

    # Check if OTP exists
    if not otp_doc.exists:
        return {"verified": False, "error": "No verification code found. Please request a new code."}

    otp_data = otp_doc.to_dict()

    # Check if already used
    if otp_data.get("used", False):
        return {"verified": False, "error": "This code has already been used. Please request a new code."}

    # Check purpose
    if otp_data.get("purpose") != expected_purpose:
        return {"verified": False, "error": "Invalid verification code for this action."}

    # Check expiry
    expires_at = datetime.fromisoformat(otp_data["expires_at"])
    if datetime.now(timezone.utc) > expires_at:
        # Clean up expired OTP
        otp_ref.delete()
        return {"verified": False, "error": "This code has expired. Please request a new code."}

    # Check max attempts
    attempts = otp_data.get("attempts", 0)
    if attempts >= MAX_VERIFY_ATTEMPTS:
        # Invalidate the OTP
        otp_ref.delete()
        return {"verified": False, "error": "Too many failed attempts. Please request a new code."}

    # Increment attempt count
    otp_ref.update({"attempts": attempts + 1})

    # Verify the hash
    submitted_hash = hash_otp(submitted_code)
    if submitted_hash != otp_data["otp_hash"]:
        remaining = MAX_VERIFY_ATTEMPTS - (attempts + 1)
        return {"verified": False, "error": f"Invalid code. {remaining} attempt(s) remaining."}

    # Success — mark as used
    otp_ref.update({"used": True})
    print(f"✅ OTP verified successfully for user {uid} (purpose: {expected_purpose})")

    return {"verified": True, "error": None}


def invalidate_otp(uid: str) -> None:
    """
    Delete any existing OTP for a user.

    Args:
        uid: The user's Firebase UID.
    """
    db = get_db_client()
    otp_ref = db.collection("otp_codes").document(uid)

    if otp_ref.get().exists:
        otp_ref.delete()
        print(f"✅ OTP invalidated for user {uid}")
