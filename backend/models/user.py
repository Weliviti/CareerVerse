from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, Dict
from datetime import datetime


class User(BaseModel):
    uid: str
    email: EmailStr
    name: str
    role: str = "student"
    created_at: datetime
    last_login: datetime
    stats: Optional[Dict] = None

    model_config = ConfigDict(populate_by_name=True)
