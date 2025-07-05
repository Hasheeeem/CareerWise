from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from supabase import create_client
from app.config import settings
import logging

logger = logging.getLogger(__name__)

security = HTTPBearer()
supabase = create_client(settings.supabase_url, settings.supabase_anon_key)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user from JWT token"""
    try:
        token = credentials.credentials
        
        # Verify token with Supabase
        user = supabase.auth.get_user(token)
        
        if not user or not user.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        return {
            "id": user.user.id,
            "email": user.user.email,
            "user_metadata": user.user.user_metadata
        }
        
    except Exception as e:
        logger.error(f"Authentication error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

async def get_optional_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user but don't require authentication"""
    try:
        if not credentials:
            return None
            
        return await get_current_user(credentials)
    except:
        return None