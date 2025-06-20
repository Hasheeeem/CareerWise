from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client
from typing import Optional
from app.core.config import settings

security = HTTPBearer()

def get_supabase_client() -> Client:
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user from JWT token"""
    try:
        token = credentials.credentials
        
        # Mock user for development - we'll implement real auth later
        return {
            "id": "dev-user-123",
            "email": "developer@careerwise.ai"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def verify_jwt_token(token: str) -> Optional[dict]:
    """Verify JWT token from Supabase"""
    try:
        # Mock for now - implement real JWT verification later
        return {"user_id": "dev-user-123", "email": "developer@careerwise.ai"}
    except Exception:
        return None