from supabase import create_client, Client
from app.config import settings
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class DatabaseService:
    def __init__(self):
        self.supabase: Client = create_client(
            settings.supabase_url, 
            settings.supabase_service_key
        )
    
    async def create_user_profile(self, user_id: str, profile_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new user profile"""
        try:
            profile_data['user_id'] = user_id
            profile_data['id'] = str(uuid.uuid4())
            profile_data['created_at'] = datetime.utcnow().isoformat()
            profile_data['updated_at'] = datetime.utcnow().isoformat()
            
            result = self.supabase.table('user_profiles').insert(profile_data).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            logger.error(f"Error creating user profile: {str(e)}")
            raise
    
    async def get_user_profile(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Get user profile by user_id"""
        try:
            result = self.supabase.table('user_profiles').select('*').eq('user_id', user_id).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            logger.error(f"Error getting user profile: {str(e)}")
            return None
    
    async def update_user_profile(self, user_id: str, profile_data: Dict[str, Any]) -> Dict[str, Any]:
        """Update user profile"""
        try:
            profile_data['updated_at'] = datetime.utcnow().isoformat()
            
            result = self.supabase.table('user_profiles').update(profile_data).eq('user_id', user_id).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            logger.error(f"Error updating user profile: {str(e)}")
            raise
    
    async def create_conversation(self, user_id: str, conversation_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new conversation"""
        try:
            conversation_data['user_id'] = user_id
            conversation_data['id'] = str(uuid.uuid4())
            conversation_data['created_at'] = datetime.utcnow().isoformat()
            conversation_data['updated_at'] = datetime.utcnow().isoformat()
            conversation_data['message_count'] = 0
            conversation_data['status'] = 'active'
            
            result = self.supabase.table('conversations').insert(conversation_data).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            logger.error(f"Error creating conversation: {str(e)}")
            raise
    
    async def get_conversation(self, conversation_id: str, user_id: str) -> Optional[Dict[str, Any]]:
        """Get conversation by ID and user_id"""
        try:
            result = self.supabase.table('conversations').select('*').eq('id', conversation_id).eq('user_id', user_id).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            logger.error(f"Error getting conversation: {str(e)}")
            return None
    
    async def get_user_conversations(self, user_id: str, limit: int = 50) -> List[Dict[str, Any]]:
        """Get all conversations for a user"""
        try:
            result = self.supabase.table('conversations').select('*').eq('user_id', user_id).eq('status', 'active').order('updated_at', desc=True).limit(limit).execute()
            return result.data or []
        except Exception as e:
            logger.error(f"Error getting user conversations: {str(e)}")
            return []
    
    async def create_message(self, message_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new chat message"""
        try:
            message_data['id'] = str(uuid.uuid4())
            message_data['created_at'] = datetime.utcnow().isoformat()
            
            result = self.supabase.table('chat_messages').insert(message_data).execute()
            
            # Update conversation message count and timestamp
            await self.update_conversation_stats(message_data['conversation_id'])
            
            return result.data[0] if result.data else None
        except Exception as e:
            logger.error(f"Error creating message: {str(e)}")
            raise
    
    async def get_conversation_messages(self, conversation_id: str, limit: int = 100) -> List[Dict[str, Any]]:
        """Get messages for a conversation"""
        try:
            result = self.supabase.table('chat_messages').select('*').eq('conversation_id', conversation_id).order('created_at', desc=False).limit(limit).execute()
            return result.data or []
        except Exception as e:
            logger.error(f"Error getting conversation messages: {str(e)}")
            return []
    
    async def update_conversation_stats(self, conversation_id: str):
        """Update conversation message count and timestamp"""
        try:
            # Get current message count
            result = self.supabase.table('chat_messages').select('id', count='exact').eq('conversation_id', conversation_id).execute()
            message_count = result.count or 0
            
            # Update conversation
            self.supabase.table('conversations').update({
                'message_count': message_count,
                'updated_at': datetime.utcnow().isoformat()
            }).eq('id', conversation_id).execute()
            
        except Exception as e:
            logger.error(f"Error updating conversation stats: {str(e)}")

# Global database service instance
db_service = DatabaseService()