from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class UserRegisterRequest(BaseModel):
    email: str
    password: str
    name: str

@router.post("/register")
async def register(user: UserRegisterRequest):
    return user
