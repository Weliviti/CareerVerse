from fastapi import APIRouter, Request, Header, HTTPException
from pydantic import BaseModel
from typing import Optional
from firebase_admin import auth
from slowapi import Limiter
from slowapi.util import get_remote_address
from services.user_service import get_user_by_uid, create_user_profile, update_user
from services.firebase_admin_service import get_db_client
from utils.responses import success_response, error_response

router = APIRouter()

# Initialize limiter for this router
limiter = Limiter(key_func=get_remote_address)


class UserRegisterRequest(BaseModel):
    uid: str
    email: str
    name: str


class LoginRequest(BaseModel):
    token: str


class VerifyTokenRequest(BaseModel):
    token: str


class UpdateProfileRequest(BaseModel):
    name: Optional[str] = None
    career_path: Optional[str] = None
    profile_picture_url: Optional[str] = None


@router.post("/register")
@limiter.limit("5/minute")
async def register(request: Request, user: UserRegisterRequest):
    """
    Register endpoint that creates a user profile in Firestore.
    This should be called after a user is successfully created in Firebase Auth on the frontend.
    """
    try:
        user_profile = create_user_profile(user.uid, user.email, user.name)
        return success_response(
            data=user_profile,
            message="User profile created successfully",
        )
    except Exception as e:
        return error_response(
            message="User registration failed",
            code=500,
            error_details=str(e),
        )


@router.post("/login")
@limiter.limit("5/minute")
async def login(request: Request, login_request: LoginRequest):
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
        decoded_token = auth.verify_id_token(login_request.token)

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


@router.put("/user/profile")
async def update_profile(profile_data: UpdateProfileRequest, authorization: str = Header(None)):
    """
    Update the current user's profile in Firestore.
    Accepts name, career_path, and profile_picture_url.
    """
    if not authorization or not authorization.startswith("Bearer "):
        return error_response(
            message="Missing or invalid Authorization header", code=401
        )

    token = authorization.split("Bearer ")[1]
    try:
        # Verify token and get UID
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token["uid"]

        # Build updates dictionary (only include non-None fields)
        updates = {}
        if profile_data.name is not None:
            updates["name"] = profile_data.name
        if profile_data.career_path is not None:
            updates["career_path"] = profile_data.career_path
        if profile_data.profile_picture_url is not None:
            updates["profile_picture_url"] = profile_data.profile_picture_url

        # Check if there are any updates to make
        if not updates:
            return error_response(
                message="No fields to update", code=400
            )

        # Update user profile
        updated_user = update_user(uid, updates)

        return success_response(
            data=updated_user,
            message="Profile updated successfully",
        )

    except auth.InvalidIdTokenError:
        return error_response(message="Invalid token", code=401)
    except auth.ExpiredIdTokenError:
        return error_response(message="Token expired", code=401)
    except Exception as e:
        return error_response(
            message="Failed to update profile", code=500, error_details=str(e)
        )


@router.delete("/account")
async def delete_account(authorization: str = Header(None)):
    """
    Delete the current user's account from both Firebase Auth and Firestore.
    """
    if not authorization or not authorization.startswith("Bearer "):
        return error_response(
            message="Missing or invalid Authorization header", code=401
        )

    token = authorization.split("Bearer ")[1]
    try:
        # Initialize Firebase first (get_db_client triggers SDK init)
        db = get_db_client()

        decoded_token = auth.verify_id_token(token)
        uid = decoded_token["uid"]

        # Step 1: Delete from Firebase Authentication
        try:
            auth.delete_user(uid)
        except auth.UserNotFoundError:
            pass

        # Step 2: Delete from Firestore Database
        user_ref = db.collection("users").document(uid)
        if user_ref.get().exists:
            user_ref.delete()

        return success_response(
            data={"uid": uid},
            message="Account deleted successfully",
        )

    except auth.InvalidIdTokenError:
        return error_response(message="Invalid token", code=401)
    except auth.ExpiredIdTokenError:
        return error_response(message="Token expired", code=401)
    except Exception as e:
        return error_response(
            message="Failed to delete account", code=500, error_details=str(e)
        )
