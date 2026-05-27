import google.generativeai as genai
from PIL import Image
import structlog

logger = structlog.get_logger()

class VLMHandler:
    def __init__(self, api_key: str):
        genai.configure(api_key=api_key)

        # Updated Gemini Vision model
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    async def detect_disease(self, image: Image.Image) -> dict:
        """
        Detect crop disease from image using Gemini Vision
        """

        try:
            prompt = """
            Analyze this crop/plant image carefully.

            Identify:
            1. Disease name
            2. Confidence level
            3. Symptoms visible
            4. Severity
            5. Recommended treatment

            Return farmer-friendly concise response.
            """

            response = self.model.generate_content(
                [prompt, image]
            )

            logger.info(
                "disease_detection_completed"
            )

            return {
                "analysis": response.text
            }

        except Exception as e:
            logger.error(
                "vlm_error",
                error=str(e)
            )
            raise

    async def get_treatment(
        self,
        disease: str,
        crop_type: str
    ) -> dict:

        try:
            prompt = f"""
            For a {crop_type} plant with {disease},
            provide:

            1. Organic treatment methods
            2. Chemical alternatives
            3. Prevention tips
            4. Recovery time estimate

            Keep it practical for farmers.
            """

            response = self.model.generate_content(
                prompt
            )

            return {
                "treatment": response.text
            }

        except Exception as e:
            logger.error(
                "treatment_generation_error",
                error=str(e)
            )
            raise


# Global handler
vlm_handler = None


def init_vlm(api_key: str):
    global vlm_handler
    vlm_handler = VLMHandler(api_key)


def get_vlm_handler():
    return vlm_handler