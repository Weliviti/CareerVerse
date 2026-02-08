from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    GEMINI_API_KEY: str
    FIREBASE_CREDENTIALS_PATH: str = "service-account.json"
    PORT: int = 5000
    ENVIRONMENT: str = "development"

    class Config:
        env_file = ".env"


settings = Settings()
