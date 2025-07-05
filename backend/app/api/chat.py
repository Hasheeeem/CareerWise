from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from fastapi.responses import StreamingResponse
from typing import List, Dict, Any, Optional
import json
import asyncio
from datetime import datetime

from app.models.chat import (
    ChatRequest, ChatResponse, ChatMessage, ChatMessageCreate, 
    ChatMessageResponse, Conversation, ConversationCreate, ConversationResponse,
    MessageType
)
from app.models.user import UserType
from app.services.ai_service import ai_service
from app.services.database_service import db_service
from app.services.cache_service import cache_service
from app.utils.auth import get_current_user

router = APIRouter(prefix="/api/v1/chat", tags=["chat"])

@router.post("/simple", response_model=ChatResponse)
async def simple_chat(request: ChatRequest):
    """Simple chat endpoint without authentication for demo purposes"""
    try:
        # Default to student if no user type specified
        user_type = UserType(request.user_type) if request.user_type else UserType.STUDENT
        
        # Generate AI response with empty conversation history for simple chat
        ai_response = await ai_service.generate_response(
            message=request.message,
            conversation_history=[],
            user_type=user_type
        )
        
        return ChatResponse(
            message_id=f"demo-{datetime.now().timestamp()}",
            conversation_id=request.conversation_id or f"demo-conv-{datetime.now().timestamp()}",
            response=ai_response,
            user_type=user_type.value,
            metadata={"demo_mode": True}
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat: {str(e)}")

@router.post("/conversation/create", response_model=ConversationResponse)
async def create_conversation(
    request: ConversationCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new conversation"""
    try:
        conversation_data = {
            "title": request.title or "New Conversation",
            "user_type": request.user_type
        }
        
        conversation = await db_service.create_conversation(
            user_id=current_user["id"],
            conversation_data=conversation_data
        )
        
        return ConversationResponse(**conversation)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating conversation: {str(e)}")

@router.get("/conversations", response_model=List[ConversationResponse])
async def get_conversations(
    current_user: dict = Depends(get_current_user)
):
    """Get all conversations for the current user"""
    try:
        conversations = await db_service.get_user_conversations(current_user["id"])
        return [ConversationResponse(**conv) for conv in conversations]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting conversations: {str(e)}")

@router.post("/conversation/{conversation_id}/message", response_model=ChatResponse)
async def send_message(
    conversation_id: str,
    request: ChatMessageCreate,
    background_tasks: BackgroundTasks,
    current_user: dict = Depends(get_current_user)
):
    """Send a message in a conversation"""
    try:
        # Verify conversation belongs to user
        conversation = await db_service.get_conversation(conversation_id, current_user["id"])
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        
        # Get user profile to determine user type
        user_profile = await cache_service.get_user_profile(current_user["id"])
        if not user_profile:
            user_profile = await db_service.get_user_profile(current_user["id"])
            if user_profile:
                await cache_service.set_user_profile(current_user["id"], user_profile)
        
        user_type = UserType(user_profile.get("user_type", "student")) if user_profile else UserType.STUDENT
        
        # Get conversation history from cache or database
        cached_history = await cache_service.get_conversation_history(conversation_id)
        if cached_history:
            conversation_history = cached_history
        else:
            messages = await db_service.get_conversation_messages(conversation_id)
            conversation_history = [
                {
                    "role": "assistant" if msg["message_type"] == "assistant" else "user",
                    "content": msg["content"]
                }
                for msg in messages
            ]
            await cache_service.set_conversation_history(conversation_id, conversation_history)
        
        # Save user message
        user_message_data = {
            "conversation_id": conversation_id,
            "content": request.content,
            "message_type": request.message_type.value,
            "metadata": request.metadata
        }
        
        user_message = await db_service.create_message(user_message_data)
        
        # Generate AI response
        ai_response = await ai_service.generate_response(
            message=request.content,
            conversation_history=conversation_history,
            user_type=user_type
        )
        
        # Save AI response
        ai_message_data = {
            "conversation_id": conversation_id,
            "content": ai_response,
            "message_type": MessageType.ASSISTANT.value,
            "metadata": {"user_type": user_type.value}
        }
        
        ai_message = await db_service.create_message(ai_message_data)
        
        # Update cache in background
        background_tasks.add_task(
            update_conversation_cache,
            conversation_id,
            conversation_history + [
                {"role": "user", "content": request.content},
                {"role": "assistant", "content": ai_response}
            ]
        )
        
        return ChatResponse(
            message_id=ai_message["id"],
            conversation_id=conversation_id,
            response=ai_response,
            user_type=user_type.value,
            metadata=ai_message.get("metadata")
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error sending message: {str(e)}")

@router.get("/conversation/{conversation_id}/messages", response_model=List[ChatMessageResponse])
async def get_conversation_messages(
    conversation_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get all messages in a conversation"""
    try:
        # Verify conversation belongs to user
        conversation = await db_service.get_conversation(conversation_id, current_user["id"])
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        
        messages = await db_service.get_conversation_messages(conversation_id)
        return [ChatMessageResponse(**msg) for msg in messages]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting messages: {str(e)}")

@router.post("/conversation/{conversation_id}/stream")
async def stream_chat(
    conversation_id: str,
    request: ChatMessageCreate,
    current_user: dict = Depends(get_current_user)
):
    """Stream AI response for real-time chat"""
    try:
        # Verify conversation belongs to user
        conversation = await db_service.get_conversation(conversation_id, current_user["id"])
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        
        # Get user profile and conversation history (similar to send_message)
        user_profile = await cache_service.get_user_profile(current_user["id"])
        if not user_profile:
            user_profile = await db_service.get_user_profile(current_user["id"])
        
        user_type = UserType(user_profile.get("user_type", "student")) if user_profile else UserType.STUDENT
        
        cached_history = await cache_service.get_conversation_history(conversation_id)
        if cached_history:
            conversation_history = cached_history
        else:
            messages = await db_service.get_conversation_messages(conversation_id)
            conversation_history = [
                {
                    "role": "assistant" if msg["message_type"] == "assistant" else "user",
                    "content": msg["content"]
                }
                for msg in messages
            ]
        
        async def generate_stream():
            full_response = ""
            async for chunk in ai_service.generate_streaming_response(
                message=request.content,
                conversation_history=conversation_history,
                user_type=user_type
            ):
                full_response += chunk
                yield f"data: {json.dumps({'chunk': chunk})}\n\n"
            
            # Save messages after streaming is complete
            await save_streamed_messages(conversation_id, request.content, full_response)
            yield f"data: {json.dumps({'done': True})}\n\n"
        
        return StreamingResponse(
            generate_stream(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            }
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error streaming chat: {str(e)}")

async def update_conversation_cache(conversation_id: str, conversation_history: List[Dict[str, str]]):
    """Background task to update conversation cache"""
    await cache_service.set_conversation_history(conversation_id, conversation_history)

async def save_streamed_messages(conversation_id: str, user_message: str, ai_response: str):
    """Save messages after streaming is complete"""
    try:
        # Save user message
        user_message_data = {
            "conversation_id": conversation_id,
            "content": user_message,
            "message_type": MessageType.USER.value
        }
        await db_service.create_message(user_message_data)
        
        # Save AI response
        ai_message_data = {
            "conversation_id": conversation_id,
            "content": ai_response,
            "message_type": MessageType.ASSISTANT.value
        }
        await db_service.create_message(ai_message_data)
        
    except Exception as e:
        print(f"Error saving streamed messages: {str(e)}")