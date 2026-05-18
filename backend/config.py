"""Application configuration management for Vanguard Combat."""
import os
from pydantic import BaseModel

class AppSettings(BaseModel):
    app_name: str = "Vanguard Combat Dynamic API"
    app_version: str = "1.0.0"
    host: str = os.getenv("HOST", "127.0.0.1")
    port: int = int(os.getenv("PORT", "8000"))
    debug: bool = os.getenv("DEBUG", "False").lower() in ("true", "1", "yes")
    cors_origins: list = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ]
    cache_ttl_seconds: int = 3600
    model_dir: str = os.path.join(os.path.dirname(__file__), "..", "model")

settings = AppSettings()
