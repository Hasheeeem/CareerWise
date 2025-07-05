from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserType(str, Enum):
    STUDENT = "student"
    GRADUATE = "graduate" 
    PROFESSIONAL = "professional"
    ENTREPRENEUR = "entrepreneur"

class ExperienceLevel(str, Enum):
    ENTRY = "entry"
    MID = "mid"
    SENIOR = "senior"
    EXECUTIVE = "executive"

class UserProfile(BaseModel):
    id: Optional[str] = None
    user_id: str
    full_name: str
    email: EmailStr
    user_type: UserType
    experience_level: Optional[ExperienceLevel] = None
    industry_interests: List[str] = []
    career_goals: List[str] = []
    skills: List[str] = []
    location: Optional[str] = None
    bio: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class UserProfileCreate(BaseModel):
    full_name: str
    email: EmailStr
    user_type: UserType
    experience_level: Optional[ExperienceLevel] = None
    industry_interests: List[str] = []
    career_goals: List[str] = []
    skills: List[str] = []
    location: Optional[str] = None
    bio: Optional[str] = None

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    user_type: Optional[UserType] = None
    experience_level: Optional[ExperienceLevel] = None
    industry_interests: Optional[List[str]] = None
    career_goals: Optional[List[str]] = None
    skills: Optional[List[str]] = None
    location: Optional[str] = None
    bio: Optional[str] = None