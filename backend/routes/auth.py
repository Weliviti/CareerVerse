from fastapi import APIRouter
from pydantic import BaseModel
from firebase_admin import auth
from services.user_service import get_user_by_uid
from utils.responses import success_response, error_response

router = APIRouter()


class UserRegisterRequest(BaseModel):
    email: str
    password: str
    name: str


class LoginRequest(BaseModel):
    token: str


class VerifyTokenRequest(BaseModel):
    token: str


@router.post("/register")
async def register(user: UserRegisterRequest):
    return user


@router.post("/login")
async def login(request: LoginRequest):
    """
    Login endpoint that verifies Firebase ID token and returns user data.

    Args:
        request: LoginRequest containing Firebase ID token

    Returns:
        Success response with user data (uid, email, name, role)
        or error response if token invalid or user not found
    """
    try:
        # Step 1: Verify Firebase ID token
        decoded_token = auth.verify_id_token(request.token)

        # Step 2: Extract UID from verified token
        uid = decoded_token["uid"]

        # Step 3: Fetch user document from Firestore
        user_data = get_user_by_uid(uid)

        # Step 4: Check if user exists
        if user_data is None:
            return error_response(
                message="User not found",
                code=404,
                error_details="No user found with this UID in database",
            )

        # Step 5: Return user data
        return success_response(
            data={
                "uid": user_data.get("uid"),
                "email": user_data.get("email"),
                "name": user_data.get("name"),
                "role": user_data.get("role"),
            },
            message="Login successful",
        )

    except auth.InvalidIdTokenError:
        return error_response(
            message="Invalid token", code=401, error_details="Token verification failed"
        )
    except auth.ExpiredIdTokenError:
        return error_response(
            message="Token expired",
            code=401,
            error_details="Token has expired, please login again",
        )
    except Exception as e:
        return error_response(
            message="Login failed",
            code=500,
            error_details=f"An error occurred during login: {str(e)}",
        )


@router.post("/verify-token")
async def verify_token(request: VerifyTokenRequest):
    """
    Verify Firebase ID token endpoint.

    Args:
        request: VerifyTokenRequest containing Firebase ID token

    Returns:
        Success response with valid=true, uid, email
        or 401 Unauthorized if token is invalid/expired
    """
    try:
        # Verify Firebase ID token
        decoded_token = auth.verify_id_token(request.token)

        # Extract basic user info from token
        uid = decoded_token.get("uid")
        email = decoded_token.get("email")

        # Return verification success with basic info
        return success_response(
            data={"valid": True, "uid": uid, "email": email},
            message="Token verified successfully",
        )

    except auth.InvalidIdTokenError:
        return error_response(
            message="Invalid token",
            code=401,
            error_details="Token verification failed",
        )
    except auth.ExpiredIdTokenError:
        return error_response(
            message="Token expired",
            code=401,
            error_details="Token has expired, please login again",
        )
    except Exception as e:
        return error_response(
            message="Token verification failed",
            code=401,
            error_details=f"An error occurred: {str(e)}",
        )
