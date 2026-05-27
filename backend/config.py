import os
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # API Config
    API_V1_STR = "/api/v1"
    PROJECT_NAME = "AgroAssist"
    PROJECT_VERSION = "1.0.0"

    # Gemini API
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///./agroassist.db"
    )

    # Vector DB
    VECTOR_DB_PATH: str = os.getenv(
        "VECTOR_DB_PATH",
        "./data/vector_db"
    )

    # File Upload
    UPLOAD_DIR: str = os.getenv(
        "UPLOAD_DIR",
        "./data/uploads"
    )

    MAX_UPLOAD_SIZE: int = 10 * 1024 * 1024

    # Models
    EMBEDDING_MODEL: str = (
        "sentence-transformers/all-MiniLM-L6-v2"
    )

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()