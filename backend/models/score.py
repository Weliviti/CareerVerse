from pydantic import BaseModel, ConfigDict
from typing import Dict
from datetime import datetime


class Score(BaseModel):
    score_id: str
    user_id: str
    session_id: str
    simulation_type: str
    skills: Dict[str, int]
    total_score: int
    feedback: str
    created_at: datetime

    model_config = ConfigDict(populate_by_name=True)
