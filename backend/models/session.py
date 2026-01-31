from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Dict
from datetime import datetime

class Session(BaseModel):
    session_id: str
    user_id: str
    simulation_type: str
    start_time: datetime
    end_time: Optional[datetime] = None
    status: str = "active"
    transcript: List[Dict[str, str]] = []

    model_config = ConfigDict(populate_by_name=True)
