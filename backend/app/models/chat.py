from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

class MessageType(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"

class ConversationStatus(str, Enum):
    ACTIVE = "active"
    ARCHIVED = "archived"
    DELETED = "deleted"

class ChatMessage(BaseModel):
    id: Optional[str] = None
    conversation_id: str
    content: str
    message_type: MessageType
    metadata: Optional[Dict[str, Any]] = None
    created_at: Optional[datetime] = None

class ChatMessageCreate(BaseModel):
    content: str
    message_type: MessageType = MessageType.USER
    metadata: Optional[Dict[str, Any]] = None

class ChatMessageResponse(BaseModel):
    id: str
    conversation_id: str
    content: str
    message_type: MessageType
    metadata: Optional[Dict[str, Any]] = None
    created_at: datetime

class Conversation(BaseModel):
    id: Optional[str] = None
    user_id: str
    title: Optional[str] = None
    status: ConversationStatus = ConversationStatus.ACTIVE
    user_type: Optional[str] = None
    message_count: int = 0
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class ConversationCreate(BaseModel):
    title: Optional[str] = None
    user_type: Optional[str] = None

class ConversationResponse(BaseModel):
    id: str
    user_id: str
    title: Optional[str] = None
    status: ConversationStatus
    user_type: Optional[str] = None
    message_count: int
    created_at: datetime
    updated_at: datetime

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
    user_type: Optional[str] = None

class ChatResponse(BaseModel):
    message_id: str
    conversation_id: str
    response: str
    user_type: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None