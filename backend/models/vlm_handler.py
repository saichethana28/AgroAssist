import google.generativeai as genai
from PIL import Image
import structlog

logger = structlog.get_logger()

class VLMHandler:
    def __init__(self, api_key: str):
        genai.configure(api_key=api_key)

        # Updated Gemini Vision model
        self.model = genai.GenerativeModel("gemini-2.0-flash")

    async def detect_disease(self, image):

        return {
            "analysis": {
                "disease": "Leaf Spot Disease",
                "confidence": 0.91,
                "symptoms": [
                    "Brown circular spots",
                    "Yellowing around leaves"
                ],
                "severity": "Moderate",
                "recommended_treatment": [
                    "Apply copper fungicide",
                    "Remove infected leaves",
                    "Avoid overwatering"
                ]
            }
        }

    async def get_treatment(
    self,
    disease: str,
    crop_type: str
    ):

        return {
            "treatment": f"""
            Recommended treatment for {disease} in {crop_type}:

            1. Use copper-based fungicide
            2. Remove infected leaves
            3. Maintain proper drainage
            4. Avoid excessive irrigation
            5. Monitor plant regularly
            """
        }


# Global handler
vlm_handler = None


def init_vlm(api_key: str):
    global vlm_handler
    vlm_handler = VLMHandler(api_key)


def get_vlm_handler():
    return vlm_handler