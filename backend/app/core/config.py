import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # API Configuration
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "CareerWise AI"
    VERSION: str = "1.0.0"
    
    # CORS Configuration
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000"
    ]
    
    # Database
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_ANON_KEY: str = os.getenv("SUPABASE_ANON_KEY", "")
    SUPABASE_SERVICE_KEY: str = os.getenv("SUPABASE_SERVICE_KEY", "")
    
    # Groq AI Services (replaced DeepSeek)
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    GROQ_BASE_URL: str = os.getenv("GROQ_BASE_URL", "https://api.groq.com/openai/v1")
    GROQ_MODEL: str = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")
    
    # Voice Services
    ELEVENLABS_API_KEY: str = os.getenv("ELEVENLABS_API_KEY", "")
    
    # Other Services
    REVENUECAT_API_KEY: str = os.getenv("REVENUECAT_API_KEY", "")
    
    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "ignore"

settings = Settings()