from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # ─── Gemini API Keys ───
    # 4 rotating keys to handle rate limits / quotas (429 errors)
    GEMINI_KEY_1: str = ""
    GEMINI_KEY_2: str = ""
    GEMINI_KEY_3: str = ""
    GEMINI_KEY_4: str = ""

    # Legacy fallback fields
    GEMINI_KEY_PERSONAS: str = ""
    GEMINI_KEY_SCORING: str = ""
    GEMINI_KEY_CAREERS: str = ""
    GEMINI_API_KEY: str = ""

    # ─── Firebase ───
    FIREBASE_CREDENTIALS_PATH: str = "../firebase/service-account.json"

    # ─── App Settings ───
    PORT: int = 5000
    ENVIRONMENT: str = "development"

    # ─── SMTP (for 2FA email OTP) ───
    SMTP_EMAIL: str = ""
    SMTP_APP_PASSWORD: str = ""

    def get_all_gemini_keys(self) -> list[str]:
        """
        Returns a list of all configured Gemini API keys,
        filtering out any empty strings.
        """
        keys = [
            self.GEMINI_KEY_1,
            self.GEMINI_KEY_2,
            self.GEMINI_KEY_3,
            self.GEMINI_KEY_4,
            self.GEMINI_KEY_PERSONAS,
            self.GEMINI_KEY_SCORING,
            self.GEMINI_KEY_CAREERS,
            self.GEMINI_API_KEY,
        ]
        # Return only unique, non-empty keys
        valid_keys = []
        for k in keys:
            if k and k.strip() and k not in valid_keys:
                valid_keys.append(k)

        if not valid_keys:
            raise ValueError("No valid Gemini API keys found in environment variables.")

        return valid_keys

    class Config:
        env_file = ".env"


settings = Settings()
