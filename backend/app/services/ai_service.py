import httpx
import json
import os
from typing import List, Dict, Optional
from app.core.config import settings

class CareerAIService:
    def __init__(self):
        self.api_key = settings.GROQ_API_KEY
        self.base_url = settings.GROQ_BASE_URL
        self.model = settings.GROQ_MODEL
        
        if self.api_key:
            self.available = True
            print(f"🚀 Groq AI initialized - Model: {self.model}")
        else:
            self.available = False
            print("⚠️  GROQ_API_KEY not found. Using mock responses.")
        
    async def get_career_guidance(
        self, 
        user_message: str, 
        user_profile: Dict,
        conversation_history: List[Dict]
    ) -> str:
        """Generate personalized career guidance using Groq AI (Lightning Fast!)"""
        
        if not self.available:
            return self._generate_mock_response(user_message, user_profile)
        
        try:
            system_prompt = self._build_system_prompt(user_profile)
            messages = self._format_conversation_history(conversation_history, user_message, system_prompt)
            
            # Call Groq API (OpenAI-compatible)
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
                    print(f"🚀 Groq AI response generated FAST! ({len(ai_response)} chars)")
                    return ai_response
                else:
                    print(f"❌ Groq API error: {response.status_code} - {response.text}")
                    return self._generate_mock_response(user_message, user_profile)
            
        except Exception as e:
            print(f"❌ Error calling Groq API: {e}")
            return self._generate_mock_response(user_message, user_profile)
    
    def _build_system_prompt(self, user_profile: Dict) -> str:
        """Build system prompt with user context"""
        current_position = user_profile.get('current_position', 'Not specified')
        industry = user_profile.get('industry', 'Not specified') 
        experience_level = user_profile.get('experience_level', 'Not specified')
        career_goals = user_profile.get('career_goals', 'Not specified')
        skills = ', '.join(user_profile.get('skills', []))
        interests = ', '.join(user_profile.get('interests', []))
        
        return f"""You are CareerWise AI, a senior career coach with 15+ years of experience. You provide personalized, actionable career guidance that helps people advance their careers strategically.

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
4. Suggest measurable goals with realistic timelines
5. Be encouraging but realistic about challenges
6. Structure responses clearly with emojis for better readability
7. Keep responses conversational, supportive, and professional
8. Always end with 2-3 specific action items they can take this week

RESPONSE FORMAT:
- Use emojis to organize sections (🎯, 📊, 🚀, 💡, etc.)
- Provide concrete examples and specific recommendations
- Include relevant industry insights when possible
- Structure with clear headings and bullet points
- End with "This Week's Action Items" with numbered list

Your goal is to be their trusted career advisor who provides clear direction and builds their confidence to take meaningful career steps."""

    def _format_conversation_history(self, history: List[Dict], current_message: str, system_prompt: str) -> List[Dict]:
        """Format conversation history for Groq API (OpenAI format)"""
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
        """Analyze career assessment responses using Groq AI"""
        if not self.available:
            return {
                "analysis": "Mock career assessment analysis would appear here with detailed insights and recommendations.",
                "confidence_score": 0.88,
                "generated_at": "2025-06-20T00:00:00Z"
            }
        
        try:
            assessment_prompt = f"""Analyze these career assessment responses and provide comprehensive insights:
            
            Assessment Data: {json.dumps(responses, indent=2)}
            
            Please provide a detailed analysis with these sections:
            
            🎯 **Top 3 Career Path Recommendations**
            - Specific job titles and roles that match their profile
            - Why each path suits their strengths and interests
            - Growth potential and market demand for each
            
            💪 **Key Strengths Analysis**
            - Their top 5 strengths based on responses
            - How to leverage these in their career
            - Examples of how these strengths create value
            
            📈 **Skill Development Plan**
            - Critical skills to develop for their target roles
            - Specific learning resources and certifications
            - Timeline for skill acquisition
            
            🌟 **Industry Insights**
            - Relevant trends in their fields of interest
            - Emerging opportunities they should watch
            - Market factors that could impact their career
            
            📋 **30-60-90 Day Action Plan**
            - Week-by-week concrete steps to take
            - Milestones to track progress
            - Resources and tools to use
            
            Format with clear sections using emojis and bullet points for easy scanning."""
            
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
                        "confidence_score": 0.92,
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
        
        return f"""Hi {name}! I'm CareerWise AI, now powered by ⚡ **Groq** for lightning-fast responses! 

🔧 **System Status**: Currently running in fallback mode - Groq API connection needed for full AI responses.

📋 **Your Question**: "{user_message}"

🎯 **Quick Career Insights**:
Based on your background in {current_role}, here are some immediate insights:

💡 **Strategic Focus Areas**:
• **Skill Development**: Identify 2-3 high-impact skills to master this quarter
• **Network Building**: Connect with 5 new professionals in your target field monthly
• **Market Research**: Stay updated with industry trends and emerging opportunities
• **Personal Branding**: Optimize your LinkedIn and build thought leadership

📈 **Growth Accelerators**:
• **Mentorship**: Find 1-2 mentors in your desired career path
• **Side Projects**: Build portfolio pieces that demonstrate your capabilities
• **Continuous Learning**: Dedicate 1 hour daily to skill development
• **Strategic Visibility**: Share insights and engage in industry discussions

**This Week's Action Items:**
1. Set up your Groq API key for instant, personalized AI career guidance
2. Update your LinkedIn headline to reflect your career aspirations
3. Research and reach out to 2 people in roles you're interested in

💡 **Pro Tip**: Once connected to Groq, I'll provide lightning-fast, detailed career strategies tailored specifically to your goals and market conditions!

What specific career challenge would you like to tackle first? ⚡"""