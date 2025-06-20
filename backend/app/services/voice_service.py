import elevenlabs
from elevenlabs import Voice, VoiceSettings, generate
import os
from typing import Dict  # Add this import

class VoiceService:
    def __init__(self):
        elevenlabs.set_api_key(os.getenv("ELEVENLABS_API_KEY"))
        
    def create_career_coach_voice(self, text: str) -> bytes:
        """Generate professional coaching voice"""
        
        voice_settings = VoiceSettings(
            stability=0.85,
            similarity_boost=0.75,
            style=0.25,
            use_speaker_boost=True
        )
        
        formatted_text = self._format_for_speech(text)
        
        audio = generate(
            text=formatted_text,
            voice=Voice(
                voice_id="21m00Tcm4TlvDq8ikWAM",
                settings=voice_settings
            ),
            model="eleven_multilingual_v2"
        )
        
        return audio
    
    def _format_for_speech(self, text: str) -> str:
        """Format text for natural speech delivery"""
        text = text.replace('. ', '. ... ')
        text = text.replace(':', ': ... ')
        text = text.replace('\n', ' ... ')
        
        coaching_intro = "Let me share some insights with you. ... "
        
        return coaching_intro + text
    
    def create_daily_motivation(self, user_goals: Dict) -> bytes:
        """Generate daily career motivation"""
        
        motivation_text = f"""
        Good morning! Let's focus on your career progress today.
        
        Your target role is {user_goals.get('target_position', 'your ideal position')}.
        
        Today's focus: {user_goals.get('daily_focus', 'taking one step forward')}.
        
        Remember, every small action you take brings you closer to your career goals.
        
        You've got this! Let's make today count.
        """
        
        return self.create_career_coach_voice(motivation_text)