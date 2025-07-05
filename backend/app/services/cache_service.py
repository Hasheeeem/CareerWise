import redis
import json
import logging
from typing import Any, Optional
from app.config import settings

logger = logging.getLogger(__name__)

class CacheService:
    def __init__(self):
        try:
            self.redis_client = redis.from_url(settings.redis_url, decode_responses=True)
            # Test connection
            self.redis_client.ping()
            logger.info("Redis connection established")
        except Exception as e:
            logger.warning(f"Redis connection failed: {str(e)}. Caching will be disabled.")
            self.redis_client = None
    
    async def get(self, key: str) -> Optional[Any]:
        """Get value from cache"""
        if not self.redis_client:
            return None
            
        try:
            value = self.redis_client.get(key)
            if value:
                return json.loads(value)
            return None
        except Exception as e:
            logger.error(f"Error getting from cache: {str(e)}")
            return None
    
    async def set(self, key: str, value: Any, expire: int = 3600) -> bool:
        """Set value in cache with expiration"""
        if not self.redis_client:
            return False
            
        try:
            serialized_value = json.dumps(value, default=str)
            return self.redis_client.setex(key, expire, serialized_value)
        except Exception as e:
            logger.error(f"Error setting cache: {str(e)}")
            return False
    
    async def delete(self, key: str) -> bool:
        """Delete key from cache"""
        if not self.redis_client:
            return False
            
        try:
            return bool(self.redis_client.delete(key))
        except Exception as e:
            logger.error(f"Error deleting from cache: {str(e)}")
            return False
    
    async def get_user_profile(self, user_id: str) -> Optional[Any]:
        """Get user profile from cache"""
        return await self.get(f"user_profile:{user_id}")
    
    async def set_user_profile(self, user_id: str, profile: Any) -> bool:
        """Cache user profile for 1 hour"""
        return await self.set(f"user_profile:{user_id}", profile, expire=3600)
    
    async def get_conversation_history(self, conversation_id: str) -> Optional[Any]:
        """Get conversation history from cache"""
        return await self.get(f"conversation:{conversation_id}")
    
    async def set_conversation_history(self, conversation_id: str, messages: Any) -> bool:
        """Cache conversation history for 30 minutes"""
        return await self.set(f"conversation:{conversation_id}", messages, expire=1800)

# Global cache service instance
cache_service = CacheService()