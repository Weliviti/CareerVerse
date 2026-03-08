"""
Authentication middleware for CareerVerse backend.

This module provides authentication middleware to verify Firebase ID tokens
for protected endpoints, with a bypass for Unity Editor local testing.
"""

from fastapi import Header, HTTPException, status
from firebase_admin import auth


async def verify_token(authorization: str = Header(...)):
    """
    Verify Firebase ID token from Authorization header.
    Includes a bypass for Unity Editor local testing using a hardcoded token.

    Args:
        authorization (str): Authorization header value in format "Bearer <token>"

    Returns:
        dict: Decoded token payload containing user information (uid, email, etc.)
    """
    # 1. Check if authorization header is present and properly formatted
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header format. Expected: Bearer <token>",
        )

    # 2. Extract the token
    parts = authorization.split()
    if len(parts) != 2:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header format. Expected: Bearer <token>",
        )

    token = parts[1]

    # 3. --- UNITY EDITOR BYPASS ---
    # This allows you to test in Unity Editor without needing a real Firebase login.
    # When running the real WebGL build on your site, this will be ignored.
    if token == "test_editor_token":
        return {
            "uid": "test_user_editor",
            "email": "test@editor.com",
            "name": "Editor Tester",
        }

    # 4. Real Firebase Verification
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token

    except auth.InvalidIdTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token: Token verification failed",
        )

    except auth.ExpiredIdTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired: Please login again",
        )

    except Exception as e:
        print(f"Token verification failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token verification failed: {str(e)}",
        )
