"""
Two-Factor Authentication (2FA) API routes for CareerVerse.

Provides endpoints for sending OTPs, verifying OTPs, and
enabling/disabling 2FA on user accounts.
"""

from fastapi import APIRouter, Request, Header
from pydantic import BaseModel
from typing import Optional
from firebase_admin import auth
from slowapi import Limiter
from slowapi.util import get_remote_address

from services.otp_service import generate_otp, hash_otp, store_otp, verify_otp, invalidate_otp
from services.email_service import send_otp_email
from services.user_service import get_user_by_uid, update_user
from utils.responses import success_response, error_response

router = APIRouter()

# Rate limiter for 2FA endpoints
limiter = Limiter(key_func=get_remote_address)


class VerifyOTPRequest(BaseModel):
    code: str
    purpose: Optional[str] = "login"


def _extract_uid_from_token(authorization: str) -> dict:
    """
    Helper to extract UID from a Bearer token.

    Returns:
        dict with 'uid' on success, or 'error' response on failure.
    """
    if not authorization or not authorization.startswith("Bearer "):
        return {"error": error_response(message="Missing or invalid Authorization header", code=401)}

    token = authorization.split("Bearer ")[1]

    try:
        decoded_token = auth.verify_id_token(token)
        return {"uid": decoded_token["uid"]}
    except auth.InvalidIdTokenError:
        return {"error": error_response(message="Invalid token", code=401)}
    except auth.ExpiredIdTokenError:
        return {"error": error_response(message="Token expired", code=401)}
    except Exception as e:
        return {"error": error_response(message="Authentication failed", code=401, error_details=str(e))}


@router.post("/send-otp")
@limiter.limit("3/5minutes")
async def send_otp(request: Request, authorization: str = Header(None)):
    """
    Generate and send an OTP code to the user's email.

    Rate limited to 3 requests per 5 minutes per IP.
    """
    result = _extract_uid_from_token(authorization)
    if "error" in result:
        return result["error"]

    uid = result["uid"]

    try:
        # Get user data to find their email
        user_data = get_user_by_uid(uid)
        if not user_data:
            return error_response(message="User not found", code=404)

        user_email = user_data.get("email")
        if not user_email:
            return error_response(message="No email address found for this account", code=400)

        # Generate, hash, and store OTP
        raw_otp = generate_otp()
        otp_hashed = hash_otp(raw_otp)

        # Determine purpose from query — default to "login"
        purpose = request.query_params.get("purpose", "login")
        if purpose not in ("login", "setup"):
            purpose = "login"

        store_otp(uid, otp_hashed, purpose=purpose)

        # Send email
        email_sent = send_otp_email(user_email, raw_otp, purpose=purpose)
        if not email_sent:
            return error_response(
                message="Failed to send verification email. Please try again.",
                code=500,
            )

        # Mask email for frontend display (e.g. "c***8@gmail.com")
        parts = user_email.split("@")
        if len(parts[0]) > 2:
            masked = parts[0][0] + "***" + parts[0][-1] + "@" + parts[1]
        else:
            masked = parts[0][0] + "***@" + parts[1]

        return success_response(
            data={"masked_email": masked},
            message="Verification code sent to your email",
        )

    except Exception as e:
        print(f"❌ Error in send-otp: {str(e)}")
        return error_response(
            message="Failed to send verification code",
            code=500,
            error_details=str(e),
        )


@router.post("/verify-otp")
@limiter.limit("10/5minutes")
async def verify_otp_endpoint(
    request: Request,
    body: VerifyOTPRequest,
    authorization: str = Header(None),
):
    """
    Verify a submitted OTP code.

    Rate limited to 10 requests per 5 minutes per IP.
    """
    result = _extract_uid_from_token(authorization)
    if "error" in result:
        return result["error"]

    uid = result["uid"]

    try:
        # Validate input
        code = body.code.strip()
        if not code or len(code) != 6 or not code.isdigit():
            return error_response(message="Please enter a valid 6-digit code", code=400)

        purpose = body.purpose if body.purpose in ("login", "setup") else "login"

        # Verify the OTP
        verification = verify_otp(uid, code, expected_purpose=purpose)

        if verification["verified"]:
            return success_response(
                data={"verified": True},
                message="Verification successful",
            )
        else:
            return error_response(
                message=verification["error"],
                code=400,
            )

    except Exception as e:
        print(f"❌ Error in verify-otp: {str(e)}")
        return error_response(
            message="Verification failed",
            code=500,
            error_details=str(e),
        )


@router.post("/enable")
async def enable_2fa(authorization: str = Header(None)):
    """
    Enable 2FA for the authenticated user.

    Should be called AFTER a successful setup OTP verification.
    """
    result = _extract_uid_from_token(authorization)
    if "error" in result:
        return result["error"]

    uid = result["uid"]

    try:
        from datetime import datetime, timezone

        update_user(uid, {
            "two_fa_enabled": True,
            "two_fa_enabled_at": datetime.now(timezone.utc).isoformat(),
        })

        # Clean up any leftover OTP
        invalidate_otp(uid)

        return success_response(
            data={"two_fa_enabled": True},
            message="Two-Step Login has been enabled",
        )

    except Exception as e:
        print(f"❌ Error enabling 2FA: {str(e)}")
        return error_response(
            message="Failed to enable Two-Step Login",
            code=500,
            error_details=str(e),
        )


@router.post("/disable")
async def disable_2fa(authorization: str = Header(None)):
    """
    Disable 2FA for the authenticated user.
    """
    result = _extract_uid_from_token(authorization)
    if "error" in result:
        return result["error"]

    uid = result["uid"]

    try:
        update_user(uid, {
            "two_fa_enabled": False,
            "two_fa_enabled_at": None,
        })

        # Clean up any leftover OTP
        invalidate_otp(uid)

        return success_response(
            data={"two_fa_enabled": False},
            message="Two-Step Login has been disabled",
        )

    except Exception as e:
        print(f"❌ Error disabling 2FA: {str(e)}")
        return error_response(
            message="Failed to disable Two-Step Login",
            code=500,
            error_details=str(e),
        )
