from fastapi import APIRouter, HTTPException, Depends
from typing import Optional

from app.models.user import UserProfile, UserProfileCreate, UserProfileUpdate
from app.services.database_service import db_service
from app.services.cache_service import cache_service
from app.utils.auth import get_current_user

router = APIRouter(prefix="/api/v1/users", tags=["users"])

@router.post("/profile", response_model=UserProfile)
async def create_user_profile(
    profile_data: UserProfileCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create user profile"""
    try:
        # Check if profile already exists
        existing_profile = await db_service.get_user_profile(current_user["id"])
        if existing_profile:
            raise HTTPException(status_code=400, detail="User profile already exists")
        
        profile = await db_service.create_user_profile(
            user_id=current_user["id"],
            profile_data=profile_data.dict()
        )
        
        # Cache the profile
        await cache_service.set_user_profile(current_user["id"], profile)
        
        return UserProfile(**profile)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating profile: {str(e)}")

@router.get("/profile", response_model=UserProfile)
async def get_user_profile(
    current_user: dict = Depends(get_current_user)
):
    """Get current user profile"""
    try:
        # Try cache first
        cached_profile = await cache_service.get_user_profile(current_user["id"])
        if cached_profile:
            return UserProfile(**cached_profile)
        
        # Get from database
        profile = await db_service.get_user_profile(current_user["id"])
        if not profile:
            raise HTTPException(status_code=404, detail="User profile not found")
        
        # Cache the profile
        await cache_service.set_user_profile(current_user["id"], profile)
        
        return UserProfile(**profile)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting profile: {str(e)}")

@router.put("/profile", response_model=UserProfile)
async def update_user_profile(
    profile_data: UserProfileUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update user profile"""
    try:
        # Filter out None values
        update_data = {k: v for k, v in profile_data.dict().items() if v is not None}
        
        if not update_data:
            raise HTTPException(status_code=400, detail="No data provided for update")
        
        profile = await db_service.update_user_profile(
            user_id=current_user["id"],
            profile_data=update_data
        )
        
        if not profile:
            raise HTTPException(status_code=404, detail="User profile not found")
        
        # Update cache
        await cache_service.set_user_profile(current_user["id"], profile)
        
        return UserProfile(**profile)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating profile: {str(e)}")

@router.delete("/profile")
async def delete_user_profile(
    current_user: dict = Depends(get_current_user)
):
    """Delete user profile"""
    try:
        # In a real app, you might want to soft delete or archive
        # For now, we'll just clear the cache
        await cache_service.delete(f"user_profile:{current_user['id']}")
        
        return {"message": "Profile deleted successfully"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting profile: {str(e)}")