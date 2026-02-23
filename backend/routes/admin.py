from fastapi import APIRouter, Header, HTTPException, Query, Request
from firebase_admin import auth, firestore
from typing import Optional, List
from models.user import User
from utils.responses import success_response, error_response

from services.firebase_admin_service import get_db_client

router = APIRouter()


async def verify_admin(authorization: str = Header(...)):
    """
    Dependency to verify that the user is an admin.
    """
    db = get_db_client()
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.split("Bearer ")[1]
    try:
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token["uid"]

        # Get user from Firestore to check role
        user_doc = db.collection("users").document(uid).get()
        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")

        user_data = user_doc.to_dict()
        if user_data.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Access forbidden: Admins only")

        return uid

    except auth.InvalidIdTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except auth.ExpiredIdTokenError:
        raise HTTPException(status_code=401, detail="Token expired")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/users")
async def get_all_users(
    request: Request,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = None,
    status: Optional[str] = None,
    # admin_uid: str = Depends(verify_admin) # TODO: specialized dependency injection if we want strict enforcement now, but for MVP/Development we might skip or use header directly.
    # For now, implementing the check inside the function or assuming public for dev if user didn't ask for strict security yet,
    # but the plan said "Create admin role check middleware" for Day 26.
    # Member 6 task for Day 28 is just "Build endpoint". I'll add a simple check using the Header.
    authorization: str = Header(None),
):
    """
    Get all users with pagination and filtering.
    """

    # ---------------------------------------------------------
    # AUTH CHECK (Simplified for this task, typically a dependency)
    # ---------------------------------------------------------
    if not authorization:
        # For development ease, if no header, maybe allow or block?
        # The requirement implies we need admin access.
        # Let's enforce it if a token is passed, otherwise return 401.
        return error_response(message="Missing Authorization header", code=401)

    try:
        # Re-using the logic from verify_admin here inline or calling it
        await verify_admin(authorization)
    except HTTPException as e:
        return error_response(message=e.detail, code=e.status_code)
    # ---------------------------------------------------------

    try:
        db = get_db_client()
        users_ref = db.collection("users")
        query = users_ref

        # Filter by Status (active/inactive) - Assumes 'isActive' or similar field.
        # The User model doesn't have 'status', but the design shows it.
        # I will assume we might need to interpret it or add it.
        # For now, let's just paginate all users.

        # Search (Client-side filtering might be needed for Firestore free tier limitation with complex queries,
        # or distinct queries. Firestore doesn't support partial string match easily like SQL LIKE %...%)
        # For a "real" app we'd use Algolia or Typesense.
        # For this MVP, if the dataset is small, fetching all and filtering in python is okay,
        # but for "pagination" it implies DB level.
        # Let's try to order by created_at desc.

        query = query.order_by("created_at", direction=firestore.Query.DESCENDING)

        # Execute query
        # Firestore pagination requires cursor. Limit/Offset is costly.
        # Simple implementation: get all, then slice (Warning: Scalability issue, but standard for MVP)
        docs = query.stream()
        all_users = []
        for doc in docs:
            user_data = doc.to_dict()
            # Convert Firestore Timestamp to ISO string for JSON serialization
            created_at = user_data.get("created_at")
            if created_at and hasattr(created_at, "isoformat"):
                user_data["created_at"] = created_at.isoformat()
            elif not created_at:
                user_data["created_at"] = None

            # Add implicit status if missing
            if "isActive" not in user_data:
                user_data["isActive"] = True

            all_users.append(user_data)

        # Apply Search (In-memory)
        if search:
            search_lower = search.lower()
            all_users = [
                u
                for u in all_users
                if search_lower in u.get("name", "").lower()
                or search_lower in u.get("email", "").lower()
            ]

        # Apply Status Filter (In-memory)
        if status:
            is_active = status.lower() == "active"
            all_users = [u for u in all_users if u.get("isActive", True) == is_active]

        # Pagination (In-memory)
        total_users = len(all_users)
        start = (page - 1) * limit
        end = start + limit
        paginated_users = all_users[start:end]

        return success_response(
            data={
                "users": paginated_users,
                "total": total_users,
                "page": page,
                "limit": limit,
                "pages": (total_users + limit - 1) // limit,
            },
            message="Users retrieved successfully",
        )

    except Exception as e:
        return error_response(
            message="Failed to fetch users", code=500, error_details=str(e)
        )
