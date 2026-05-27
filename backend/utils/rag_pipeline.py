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
    3. Inject context into prompt
    4. Generate intelligent response
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

        enhanced_prompt = f"""
        Agricultural Knowledge Base Context:

        {context}

        Farmer Query:
        {query}

        Provide:
        1. Clear explanation
        2. Practical recommendation
        3. Farmer-friendly guidance
        4. Preventive measures if needed
        """

        try:

            response = (
                vlm_handler.model.generate_content(
                    enhanced_prompt
                )
            )

            return response.text

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