"""
Authentication middleware for CareerVerse backend.

This module provides authentication middleware to verify Firebase ID tokens
for protected endpoints.
"""

from fastapi import Header, HTTPException
from firebase_admin import auth


def verify_token(authorization: str = Header(...)):
    """
    Verify Firebase ID token from Authorization header.

    This middleware function extracts and verifies the Firebase ID token
    from the Authorization header. It should be used as a dependency
    for protected endpoints.

    Args:
        authorization (str): Authorization header value in format "Bearer <token>"

    Returns:
        dict: Decoded token payload containing user information (uid, email, etc.)

    Raises:
        HTTPException: 401 if token is missing, invalid, or expired

    Example:
        ```python
        @app.get("/protected")
        async def protected_route(user=Depends(verify_token)):
            return {"user_id": user["uid"]}
        ```
    """
    # Check if authorization header is present and properly formatted
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    # Extract token from "Bearer <token>" format
    parts = authorization.split()

    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(
            status_code=401,
            detail="Invalid authorization header format. Expected: Bearer <token>",
        )

    token = parts[1]

    try:
        # Verify the Firebase ID token
        decoded_token = auth.verify_id_token(token)
        return decoded_token

    except auth.InvalidIdTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token: Token verification failed",
        )

    except auth.ExpiredIdTokenError:
        raise HTTPException(
            status_code=401,
            detail="Token expired: Please login again",
        )

    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=f"Token verification failed: {str(e)}",
        )
