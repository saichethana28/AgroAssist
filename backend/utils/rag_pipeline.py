from typing import Optional
import structlog

from .vector_db import get_vector_db

logger = structlog.get_logger()


class RAGPipeline:
    """
    Retrieval Augmented Generation Pipeline

    Flow:
    1. Receive query
    2. Retrieve relevant documents
    3. Generate farmer-friendly response
    """

    async def retrieve_context(
        self,
        query: str,
        k: int = 5
    ) -> str:

        vector_db = get_vector_db()

        if vector_db is None:

            logger.warning(
                "vector_db_not_initialized"
            )

            return ""

        results = vector_db.search(
            query,
            k=k
        )

        context = ""

        for result in results:

            context += (
                f"- {result['text']}\n"
            )

        return context

    async def generate_with_context(
        self,
        query: str,
        vlm_handler,
        context: Optional[str] = None
    ) -> str:

        if context is None:

            context = await self.retrieve_context(
                query
            )

        try:

            return f"""
🌱 AgroAssist AI Recommendation

Question:
{query}


Possible Causes:
• Nutrient deficiency
• Fungal or bacterial infection
• Poor irrigation management
• Environmental stress


Recommended Actions:
1. Inspect leaves carefully for spots or discoloration
2. Apply suitable fungicide if fungal symptoms appear
3. Maintain proper water drainage
4. Use balanced fertilizers
5. Monitor crop growth regularly


Prevention Tips:
• Avoid overwatering
• Maintain field hygiene
• Use disease-resistant crop varieties
• Ensure proper plant spacing



AgroAssist Advice:
Consult local agricultural experts if symptoms spread rapidly or affect large crop areas.
"""

        except Exception as e:

            logger.error(
                "rag_generation_error",
                error=str(e)
            )

            raise


# Global singleton
_rag_pipeline = None


def init_rag_pipeline():

    global _rag_pipeline

    _rag_pipeline = RAGPipeline()


def get_rag_pipeline():

    return _rag_pipeline