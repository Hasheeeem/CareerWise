from supabase import create_client, Client
import os
from typing import Dict, List, Optional, Any
import json
from datetime import datetime

class SupabaseService:
    def __init__(self):
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_SERVICE_KEY")
        if not url or not key:
            print("Warning: Supabase credentials not found. Running in mock mode.")
            self.supabase = None
        else:
            self.supabase: Client = create_client(url, key)
    
    async def get_user_profile(self, user_id: str) -> Dict:
        """Get user profile with career data"""
        if not self.supabase:
            return self._get_mock_user_profile(user_id)
            
        try:
            response = self.supabase.table("user_profiles").select("*").eq("id", user_id).execute()
            
            if response.data:
                return response.data[0]
            else:
                # Return default profile if none exists
                return {
                    "id": user_id,
                    "current_position": None,
                    "industry": None,
                    "experience_level": None,
                    "career_goals": None,
                    "skills": [],
                    "interests": [],
                    "values": []
                }
        except Exception as e:
            print(f"Error fetching user profile: {e}")
            return self._get_mock_user_profile(user_id)
    
    async def create_conversation(self, conversation_id: str, user_id: str) -> bool:
        """Create a new conversation"""
        if not self.supabase:
            print(f"Mock: Created conversation {conversation_id} for user {user_id}")
            return True
            
        try:
            # First, ensure the demo user profile exists
            await self.ensure_demo_user_exists(user_id)
            
            response = self.supabase.table("conversations").insert({
                "id": conversation_id,
                "user_id": user_id,
                "title": "Career Chat",
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat()
            }).execute()
            
            return len(response.data) > 0
        except Exception as e:
            print(f"Error creating conversation: {e}")
            return False
    
    async def ensure_demo_user_exists(self, user_id: str) -> bool:
        """Ensure demo user profile exists in database"""
        if not self.supabase:
            return True
            
        try:
            # Check if user exists
            response = self.supabase.table("user_profiles").select("id").eq("id", user_id).execute()
            
            if not response.data:
                # Create demo user profile
                demo_profile = {
                    "id": user_id,
                    "full_name": "Demo User",
                    "current_position": "Software Developer",
                    "industry": "Technology",
                    "experience_level": "mid",
                    "career_goals": "Advance to senior developer role and explore AI/ML",
                    "skills": ["Python", "JavaScript", "React", "Problem Solving", "Communication"],
                    "interests": ["AI/ML", "Web Development", "Career Growth", "Mentoring"],
                    "values": ["Work-life balance", "Continuous learning", "Team collaboration"],
                    "created_at": datetime.utcnow().isoformat(),
                    "updated_at": datetime.utcnow().isoformat()
                }
                
                create_response = self.supabase.table("user_profiles").insert(demo_profile).execute()
                print(f"Created demo user profile: {len(create_response.data) > 0}")
                return len(create_response.data) > 0
            
            return True
        except Exception as e:
            print(f"Error ensuring demo user exists: {e}")
            return False
    
    async def get_conversation_messages(
        self, 
        conversation_id: str, 
        limit: int = 50, 
        offset: int = 0
    ) -> List[Dict]:
        """Get messages for a conversation"""
        if not self.supabase:
            return self._get_mock_messages(conversation_id)
            
        try:
            response = self.supabase.table("messages").select("*").eq(
                "conversation_id", conversation_id
            ).order("created_at", desc=False).limit(limit).offset(offset).execute()
            
            return response.data or []
        except Exception as e:
            print(f"Error fetching messages: {e}")
            return self._get_mock_messages(conversation_id)
    
    async def insert_message(self, message_data: Dict) -> bool:
        """Insert a new message"""
        if not self.supabase:
            print(f"Mock: Inserted message - {message_data.get('content', '')[:50]}...")
            return True
            
        try:
            response = self.supabase.table("messages").insert(message_data).execute()
            return len(response.data) > 0
        except Exception as e:
            print(f"Error inserting message: {e}")
            return False
    
    async def update_user_profile(self, user_id: str, profile_data: Dict) -> bool:
        """Update or create user profile"""
        if not self.supabase:
            print(f"Mock: Updated profile for user {user_id}")
            return True
            
        try:
            response = self.supabase.table("user_profiles").upsert({
                "id": user_id,
                **profile_data
            }).execute()
            return len(response.data) > 0
        except Exception as e:
            print(f"Error updating profile: {e}")
            return False
    
    async def save_assessment_results(self, user_id: str, assessment_data: Dict) -> str:
        """Save career assessment results"""
        if not self.supabase:
            print(f"Mock: Saved assessment for user {user_id}")
            return "mock-assessment-id"
            
        try:
            response = self.supabase.table("assessments").insert({
                "user_id": user_id,
                **assessment_data
            }).execute()
            
            if response.data:
                return response.data[0]["id"]
            return None
        except Exception as e:
            print(f"Error saving assessment: {e}")
            return None
    
    async def get_user_assessments(self, user_id: str) -> List[Dict]:
        """Get user's assessment history"""
        if not self.supabase:
            return []
            
        try:
            response = self.supabase.table("assessments").select("*").eq(
                "user_id", user_id
            ).order("completed_at", desc=True).execute()
            
            return response.data or []
        except Exception as e:
            print(f"Error fetching assessments: {e}")
            return []
    
    # Mock methods for when Supabase is not available
    def _get_mock_user_profile(self, user_id: str) -> Dict:
        """Mock user profile for development"""
        return {
            "id": user_id,
            "full_name": "Demo User",
            "current_position": "Software Developer",
            "industry": "Technology",
            "experience_level": "mid",
            "career_goals": "Advance to senior developer role",
            "skills": ["Python", "JavaScript", "React", "Problem Solving"],
            "interests": ["AI/ML", "Web Development", "Career Growth"],
            "values": ["Work-life balance", "Continuous learning", "Team collaboration"]
        }
    
    def _get_mock_messages(self, conversation_id: str) -> List[Dict]:
        """Mock messages for development"""
        return [
            {
                "id": "mock-1",
                "conversation_id": conversation_id,
                "sender_type": "assistant",
                "content": "Hi! I'm CareerWise AI. How can I help with your career today?",
                "created_at": datetime.utcnow().isoformat()
            }
        ]