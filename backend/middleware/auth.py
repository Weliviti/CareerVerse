from fastapi import Header, HTTPException, status
from firebase_admin import auth


async def verify_token(authorization: str = Header(...)):
    """
    Verifies the Firebase ID Token with a bypass for Unity Editor and Mock React users.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header format. Expected: Bearer <token>",
        )

    token = authorization.split(" ")[1]

    # --- BYPASS FOR TESTING ---
    # Allowing 'test_editor_token' (Unity) and 'test_token' (React Mock)
    if token == "test_editor_token" or token == "test_token":
        return {"uid": "test_user_editor", "email": "test@editor.com"}

    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token verification failed: {str(e)}",
        )
