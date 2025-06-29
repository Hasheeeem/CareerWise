from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Dict, Any, Optional
import uuid
from datetime import datetime
import os

# Import services (we'll implement these step by step)
try:
    from app.services.ai_service import CareerAIService
    AI_SERVICE_AVAILABLE = True
except ImportError:
    AI_SERVICE_AVAILABLE = False

try:
    from app.services.supabase_service import SupabaseService
    DB_SERVICE_AVAILABLE = True
except ImportError:
    DB_SERVICE_AVAILABLE = False

router = APIRouter()

# Pydantic models for request/response
class ChatRequest(BaseModel):
    conversation_id: str
    message: str
    include_voice: bool = False

class SimpleChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    message_id: str
    response: str
    audio_url: Optional[str] = None

class ConversationResponse(BaseModel):
    conversation_id: str
    title: str
    created_at: str

# Initialize services if available
if AI_SERVICE_AVAILABLE:
    ai_service = CareerAIService()
else:
    ai_service = None

if DB_SERVICE_AVAILABLE:
    db_service = SupabaseService()
else:
    db_service = None

# Generate a consistent demo user UUID
DEMO_USER_UUID = "550e8400-e29b-41d4-a716-446655440000"  # Valid UUID format

@router.post("/process", response_model=ChatResponse)
async def process_chat_message(
    request: ChatRequest,
    background_tasks: BackgroundTasks
):
    """Process chat message and generate AI response"""
    try:
        # If AI service is available, use it
        if ai_service and AI_SERVICE_AVAILABLE:
            # Get user profile and conversation history from database
            user_profile = {}
            conversation_history = []
            
            if db_service and DB_SERVICE_AVAILABLE:
                try:
                    user_profile = await db_service.get_user_profile(DEMO_USER_UUID)
                    conversation_history = await db_service.get_conversation_messages(
                        request.conversation_id, limit=10
                    )
                except Exception as e:
                    print(f"Database error: {e}")
            
            # Generate AI response
            ai_response = await ai_service.get_career_guidance(
                user_message=request.message,
                user_profile=user_profile,
                conversation_history=conversation_history
            )
        else:
            # Fallback: Mock AI response with career-focused content
            ai_response = generate_mock_career_response(request.message)
        
        # Generate message ID
        message_id = str(uuid.uuid4())
        
        # Save to database if available
        if db_service and DB_SERVICE_AVAILABLE:
            try:
                # Save user message first
                await db_service.insert_message({
                    "id": str(uuid.uuid4()),
                    "conversation_id": request.conversation_id,
                    "sender_type": "user",
                    "content": request.message,
                    "created_at": datetime.utcnow().isoformat()
                })
                
                # Save AI response
                await db_service.insert_message({
                    "id": message_id,
                    "conversation_id": request.conversation_id,
                    "sender_type": "assistant",
                    "content": ai_response,
                    "created_at": datetime.utcnow().isoformat()
                })
            except Exception as e:
                print(f"Error saving message: {e}")
        
        response_data = ChatResponse(
            message_id=message_id,
            response=ai_response
        )
        
        # Generate voice audio if requested (background task)
        if request.include_voice:
            background_tasks.add_task(
                generate_voice_response,
                ai_response,
                message_id
            )
        
        return response_data
        
    except Exception as e:
        print(f"Error in process_chat_message: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing message: {str(e)}")

@router.post("/simple", response_model=ChatResponse)
async def simple_chat(request: SimpleChatRequest):
    """Simple chat endpoint without conversation tracking"""
    try:
        # Get user profile for context (if available)
        user_profile = {}
        if db_service and DB_SERVICE_AVAILABLE:
            try:
                user_profile = await db_service.get_user_profile(DEMO_USER_UUID)
            except Exception as e:
                print(f"Could not get user profile: {e}")
        
        # Generate AI response
        if ai_service and AI_SERVICE_AVAILABLE:
            ai_response = await ai_service.get_career_guidance(
                user_message=request.message,
                user_profile=user_profile,
                conversation_history=[]
            )
        else:
            ai_response = generate_mock_career_response(request.message)
        
        return ChatResponse(
            message_id=str(uuid.uuid4()),
            response=ai_response
        )
        
    except Exception as e:
        print(f"Error in simple_chat: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing message: {str(e)}")

@router.get("/conversation/{conversation_id}/messages")
async def get_conversation_messages(
    conversation_id: str,
    limit: int = 50,
    offset: int = 0
):
    """Get messages for a conversation"""
    try:
        if db_service and DB_SERVICE_AVAILABLE:
            messages = await db_service.get_conversation_messages(
                conversation_id, limit=limit, offset=offset
            )
            return {"messages": messages}
        else:
            # Return mock data
            return {
                "messages": [
                    {
                        "id": str(uuid.uuid4()),
                        "conversation_id": conversation_id,
                        "sender_type": "assistant",
                        "content": "Welcome to CareerWise! How can I help you with your career today?",
                        "created_at": datetime.now().isoformat()
                    }
                ]
            }
    except Exception as e:
        print(f"Error in get_conversation_messages: {e}")
        raise HTTPException(status_code=500, detail=f"Error fetching messages: {str(e)}")

@router.post("/conversation/create", response_model=ConversationResponse)
async def create_conversation():
    """Create a new conversation"""
    try:
        conversation_id = str(uuid.uuid4())
        created_at = datetime.now().isoformat()
        
        if db_service and DB_SERVICE_AVAILABLE:
            # Save to database with proper UUID
            try:
                success = await db_service.create_conversation(conversation_id, DEMO_USER_UUID)
                if not success:
                    print("Failed to create conversation in database, continuing with mock")
            except Exception as e:
                print(f"Error creating conversation in DB: {e}")
        
        return ConversationResponse(
            conversation_id=conversation_id,
            title="Career Chat",
            created_at=created_at
        )
    except Exception as e:
        print(f"Error in create_conversation: {e}")
        raise HTTPException(status_code=500, detail=f"Error creating conversation: {str(e)}")

@router.get("/test")
async def test_endpoint():
    """Test endpoint to verify chat API is working"""
    return {
        "message": "Chat API is working!",
        "timestamp": datetime.now().isoformat(),
        "status": "healthy",
        "ai_service_available": AI_SERVICE_AVAILABLE,
        "db_service_available": DB_SERVICE_AVAILABLE,
        "groq_key_configured": bool(os.getenv("GROQ_API_KEY")),
        "groq_model": os.getenv("GROQ_MODEL", "llama-3.1-8b-instant"),
        "demo_user_id": DEMO_USER_UUID
    }

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "services": {
            "ai": AI_SERVICE_AVAILABLE,
            "database": DB_SERVICE_AVAILABLE,
            "voice": bool(os.getenv("ELEVENLABS_API_KEY"))
        },
        "timestamp": datetime.now().isoformat()
    }

# Helper functions
def generate_mock_career_response(user_message: str) -> str:
    """Generate intelligent mock responses based on career topics"""
    message_lower = user_message.lower()
    
    # Career advice responses based on keywords
    if any(word in message_lower for word in ['career', 'job', 'work', 'profession']):
        if any(word in message_lower for word in ['change', 'switch', 'transition']):
            return """Great question about career transitions! Here are some key steps to consider:

🎯 **Self-Assessment**: 
- Identify your transferable skills and strengths
- Clarify your values and what you want in your next role
- Assess your interests and passion areas

📊 **Research & Planning**:
- Explore new industries and roles that align with your goals  
- Research salary ranges and growth potential
- Identify skill gaps and create a learning plan

🤝 **Network & Connect**:
- Reach out to professionals in your target field
- Attend industry events and online communities
- Consider informational interviews

**This Week's Action Items:**
1. Write down 3 specific roles you'd like to explore
2. Identify 5 people in those fields to connect with on LinkedIn
3. Research one online course or certification relevant to your target field

What specific aspect of career change would you like to explore further?"""
        
        elif any(word in message_lower for word in ['should', 'pursue', 'choose']):
            return """Excellent question! Let me help you explore career paths that align with your strengths and interests.

🔍 **Career Exploration Strategy**:
- **Skills-Based Approach**: Look for roles that utilize your strongest abilities
- **Interest-Driven Path**: Consider fields that align with what excites you
- **Market Opportunity**: Research growing industries and emerging roles
- **Values Alignment**: Ensure the work environment matches your priorities

🚀 **Popular Growing Fields**:
- **Technology**: AI/ML, Cybersecurity, Cloud Computing, Data Science
- **Healthcare**: Telehealth, Mental Health, Healthcare Technology
- **Sustainability**: Renewable Energy, Environmental Consulting
- **Digital Marketing**: Content Creation, Social Media Strategy, SEO

🎯 **Next Steps**:
1. Take a career assessment to identify your personality type and work preferences
2. Shadow professionals in 2-3 industries that interest you
3. Research job postings to understand required skills and qualifications

**This Week's Action Items:**
1. List your top 5 skills and top 3 interests
2. Research 3 career paths that combine both
3. Schedule one informational interview

What industries or types of work have you been curious about lately?"""
    
    elif any(word in message_lower for word in ['resume', 'cv']):
        return """Let's optimize your resume for maximum impact!

📝 **Resume Optimization Strategy**:

**Structure & Format**:
- Clean, ATS-friendly design with clear sections
- Professional summary highlighting your value proposition
- Reverse chronological work experience
- Skills section with relevant keywords

**Content Enhancement**:
- Use action verbs and quantify achievements (increased, reduced, managed)
- Tailor content to each job application
- Include relevant keywords from job postings
- Focus on accomplishments, not just duties

**Key Sections to Perfect**:
1. **Professional Summary**: 2-3 lines showcasing your unique value
2. **Experience**: Focus on measurable accomplishments
3. **Skills**: Mix of technical and soft skills
4. **Education/Certifications**: Include relevant training

**This Week's Action Items:**
1. Rewrite your professional summary with specific achievements
2. Add metrics to at least 3 bullet points in your experience section
3. Research and add 5 relevant keywords from target job postings

Would you like me to help with a specific section of your resume?"""
    
    elif any(word in message_lower for word in ['interview', 'interviewing']):
        return """Interview preparation is crucial for success! Here's your action plan:

🎯 **Before the Interview**:
- Research the company, role, and interviewer
- Prepare STAR method examples for common questions
- Practice your elevator pitch and key talking points
- Prepare thoughtful questions to ask the interviewer

💪 **During the Interview**:
- Arrive early and dress appropriately
- Maintain good eye contact and positive body language
- Provide specific examples with measurable results
- Ask engaging questions about the role and company

📋 **Common Questions to Prepare**:
- "Tell me about yourself"
- "Why are you interested in this role?"
- "What's your greatest strength/weakness?"
- "Describe a challenge you overcame"

**This Week's Action Items:**
1. Prepare 5 STAR method stories showcasing different skills
2. Research the company's recent news and initiatives
3. Practice your responses out loud or with a friend

What type of interview are you preparing for? I can provide more specific guidance!"""
    
    else:
        return f"""Hi there! Thanks for reaching out to CareerWise AI, your personal career guidance assistant.

I'm here to help you navigate every aspect of your professional journey:

🎯 **Career Planning**: Explore paths, set goals, and create actionable plans
📝 **Job Search Strategy**: Resume optimization, interview prep, and networking
📈 **Skill Development**: Identify growth opportunities and learning resources  
💼 **Career Advancement**: Leadership development and promotion strategies
🔄 **Career Transitions**: Navigate industry changes or role switches

**Popular Questions I Help With**:
- "What career should I pursue?"
- "How can I improve my resume?"
- "What skills should I develop next?"
- "How do I prepare for interviews?"
- "How can I negotiate my salary?"

**This Week's Action Items**:
1. Think about what specific career challenge you'd like to tackle
2. Consider what aspect of your career you'd like to improve most
3. Ask me a specific question about your career goals

What's your most pressing career question right now? The more details you share, the more personalized guidance I can provide!"""

async def generate_voice_response(text: str, message_id: str):
    """Background task to generate voice response"""
    try:
        print(f"Voice generation requested for message {message_id}")
        # This will be implemented when voice service is available
    except Exception as e:
        print(f"Error generating voice response: {e}")