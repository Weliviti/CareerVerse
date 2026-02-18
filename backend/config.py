from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # ─── Gemini API Keys ───
    # 3 separate keys for different AI purposes (cost tracking & isolation)
    GEMINI_KEY_PERSONAS: str = ""  # AI agent conversations
    GEMINI_KEY_SCORING: str = ""  # Scoring & evaluation
    GEMINI_KEY_CAREERS: str = ""  # Career recommendations

    # Legacy single key — used as fallback if specific keys are not set
    GEMINI_API_KEY: str

    # ─── Firebase ───
    FIREBASE_CREDENTIALS_PATH: str = "service-account.json"

    # ─── App Settings ───
    PORT: int = 5000
    ENVIRONMENT: str = "development"

    def get_gemini_key(self, purpose: str = "personas") -> str:
        """
        Get the appropriate Gemini API key based on purpose.

        Args:
            purpose: One of 'personas', 'scoring', or 'careers'

        Returns:
            The API key string

        Raises:
            ValueError: If no API key is available for the given purpose
        """
        key_map = {
            "personas": self.GEMINI_KEY_PERSONAS,
            "scoring": self.GEMINI_KEY_SCORING,
            "careers": self.GEMINI_KEY_CAREERS,
        }

        # Try specific key first, then fall back to legacy key
        specific_key = key_map.get(purpose)
        if specific_key:
            return specific_key

        if self.GEMINI_API_KEY:
            return self.GEMINI_API_KEY

        raise ValueError(
            f"No Gemini API key found for purpose '{purpose}'. "
            f"Set GEMINI_KEY_{purpose.upper()} or GEMINI_API_KEY in .env"
        )

    class Config:
        env_file = ".env"


settings = Settings()
