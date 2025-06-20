from fastapi import APIRouter
from app.api.endpoints import chat

api_router = APIRouter()

# Start with just chat endpoint - add others later
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])

# TODO: Add these when the endpoint files are created
# api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
# api_router.include_router(career.router, prefix="/career", tags=["career"])
# api_router.include_router(assessments.router, prefix="/assessments", tags=["assessments"])