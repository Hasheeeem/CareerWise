import httpx
import json
import os
from typing import List, Dict, Optional
from app.core.config import settings

class CareerAIService:
    def __init__(self):
        self.api_key = settings.DEEPSEEK_API_KEY
        self.base_url = settings.DEEPSEEK_BASE_URL
        self.model = settings.DEEPSEEK_MODEL
        
        if self.api_key:
            self.available = True
            print(f"✅ DeepSeek AI initialized - Model: {self.model}")
        else:
            self.available = False
            print("⚠️  DEEPSEEK_API_KEY not found. Using mock responses.")
        
    async def get_career_guidance(
        self, 
        user_message: str, 
        user_profile: Dict,
        conversation_history: List[Dict]
    ) -> str:
        """Generate personalized career guidance using DeepSeek AI"""
        
        if not self.available:
            return self._generate_mock_response(user_message, user_profile)
        
        try:
            system_prompt = self._build_system_prompt(user_profile)
            messages = self._format_conversation_history(conversation_history, user_message, system_prompt)
            
            # Call DeepSeek API
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": self.model,
                        "messages": messages,
                        "max_tokens": 1500,
                        "temperature": 0.3,  # Lower for consistent career advice
                        "top_p": 0.9,
                        "frequency_penalty": 0.1,
                        "presence_penalty": 0.1,
                        "stream": False
                    }
                )
                
                if response.status_code == 200:
                    result = response.json()
                    ai_response = result["choices"][0]["message"]["content"]
                    print(f"✅ DeepSeek AI response generated ({len(ai_response)} chars)")
                    return ai_response
                else:
                    print(f"❌ DeepSeek API error: {response.status_code} - {response.text}")
                    return self._generate_mock_response(user_message, user_profile)
            
        except Exception as e:
            print(f"❌ Error calling DeepSeek API: {e}")
            return self._generate_mock_response(user_message, user_profile)
    
    def _build_system_prompt(self, user_profile: Dict) -> str:
        """Build system prompt with user context"""
        current_position = user_profile.get('current_position', 'Not specified')
        industry = user_profile.get('industry', 'Not specified') 
        experience_level = user_profile.get('experience_level', 'Not specified')
        career_goals = user_profile.get('career_goals', 'Not specified')
        skills = ', '.join(user_profile.get('skills', []))
        interests = ', '.join(user_profile.get('interests', []))
        
        return f"""You are CareerWise AI, a senior career coach with 15+ years of experience helping professionals navigate their careers. You provide personalized, actionable career guidance.

USER PROFILE CONTEXT:
- Current Position: {current_position}
- Industry: {industry}
- Experience Level: {experience_level}
- Career Goals: {career_goals}
- Skills: {skills}
- Interests: {interests}

CONVERSATION GUIDELINES:
1. Provide specific, actionable advice based on their profile
2. Ask clarifying questions to better understand their situation
3. Reference current market trends and data when relevant
4. Suggest measurable goals and timelines
5. Be encouraging but realistic about challenges
6. Structure responses with clear sections using emojis
7. Keep responses conversational, supportive, and professional
8. Always end with 2-3 specific action items they can take this week

RESPONSE FORMAT:
- Use emojis to organize sections (🎯, 📊, 🚀, etc.)
- Provide concrete examples and specific recommendations
- Include relevant industry insights
- End with "This Week's Action Items" with numbered list

Remember: You're not just answering questions - you're guiding their career journey with expertise and empathy."""

    def _format_conversation_history(self, history: List[Dict], current_message: str, system_prompt: str) -> List[Dict]:
        """Format conversation history for DeepSeek API"""
        messages = [
            {"role": "system", "content": system_prompt}
        ]
        
        # Add last 5 messages for context
        for msg in history[-5:]:
            messages.append({
                "role": "user" if msg["sender_type"] == "user" else "assistant",
                "content": msg["content"]
            })
        
        # Add current message
        messages.append({"role": "user", "content": current_message})
        
        return messages
    
    async def analyze_career_assessment(self, responses: Dict) -> Dict:
        """Analyze career assessment responses using DeepSeek AI"""
        if not self.available:
            return {
                "analysis": "Mock career assessment analysis would appear here with detailed insights.",
                "confidence_score": 0.85,
                "generated_at": "2025-06-20T00:00:00Z"
            }
        
        try:
            assessment_prompt = f"""Analyze these career assessment responses and provide comprehensive insights:
            
            Assessment Data: {json.dumps(responses, indent=2)}
            
            Please provide a detailed analysis with:
            
            1. **Top 3 Career Path Recommendations** with specific rationale
            2. **Key Strengths Analysis** and how to leverage them
            3. **Skill Gap Assessment** with specific learning recommendations
            4. **Industry Trends** relevant to their interests and profile
            5. **30-60-90 Day Action Plan** with concrete steps
            
            Format your response with clear sections using emojis and bullet points."""
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": self.model,
                        "messages": [{"role": "user", "content": assessment_prompt}],
                        "max_tokens": 2000,
                        "temperature": 0.2
                    }
                )
                
                if response.status_code == 200:
                    result = response.json()
                    analysis = result["choices"][0]["message"]["content"]
                    
                    return {
                        "analysis": analysis,
                        "confidence_score": 0.88,
                        "generated_at": "2025-06-20T00:00:00Z"
                    }
                else:
                    print(f"Assessment API error: {response.status_code}")
                    return {"error": f"Assessment analysis failed: API error {response.status_code}"}
            
        except Exception as e:
            print(f"Assessment analysis error: {e}")
            return {"error": f"Assessment analysis failed: {str(e)}"}
    
    def _generate_mock_response(self, user_message: str, user_profile: Dict) -> str:
        """Generate intelligent mock responses for development (fallback only)"""
        message_lower = user_message.lower()
        name = user_profile.get('full_name', 'there')
        current_role = user_profile.get('current_position', 'your current role')
        
        return f"""Hi {name}! I'm CareerWise AI, powered by DeepSeek. 

🔧 **System Status**: Currently running in fallback mode - DeepSeek API connection needed for full AI responses.

📋 **Your Question**: "{user_message}"

🎯 **Quick Career Guidance**:
Based on your background in {current_role}, here are some immediate insights:

• **Career Development**: Focus on building both technical and leadership skills
• **Market Trends**: Stay updated with industry changes and emerging technologies  
• **Networking**: Connect with professionals in your target field
• **Skill Building**: Identify 2-3 key skills to develop this quarter

**This Week's Action Items:**
1. Set up your DeepSeek API key for personalized AI guidance
2. Update your LinkedIn profile with recent achievements
3. Research 3 companies in your target industry

💡 **Pro Tip**: Once the AI is fully connected, I'll provide much more detailed, personalized career strategies based on current market data and your specific goals!

What specific aspect of your career would you like to focus on next?"""