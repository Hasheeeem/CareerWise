import requests
import os
from typing import Dict, Optional

class SubscriptionService:
    def __init__(self):
        self.api_key = os.getenv("REVENUECAT_API_KEY")
        self.base_url = "https://api.revenuecat.com/v1"
    
    async def check_subscription_status(self, user_id: str) -> Dict:
        """Check user's subscription status"""
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            response = requests.get(
                f"{self.base_url}/subscribers/{user_id}",
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                entitlements = data.get("subscriber", {}).get("entitlements", {})
                
                return {
                    "is_premium": "premium" in entitlements,
                    "expires_date": entitlements.get("premium", {}).get("expires_date"),
                    "product_identifier": entitlements.get("premium", {}).get("product_identifier")
                }
            
            return {"is_premium": False}
            
        except Exception as e:
            print(f"Error checking subscription: {e}")
            return {"is_premium": False}

    async def handle_webhook(self, webhook_data: Dict) -> bool:
        """Handle RevenueCat webhook events"""
        try:
            event_type = webhook_data.get("event", {}).get("type")
            user_id = webhook_data.get("event", {}).get("app_user_id")
            
            if event_type == "INITIAL_PURCHASE":
                await self.grant_premium_access(user_id)
            elif event_type == "CANCELLATION":
                await self.revoke_premium_access(user_id)
            elif event_type == "RENEWAL":
                await self.extend_premium_access(user_id)
            
            return True
        except Exception as e:
            print(f"Error handling webhook: {e}")
            return False