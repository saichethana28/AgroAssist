from fastapi import (
    FastAPI,
    UploadFile,
    File,
    HTTPException
)

from fastapi.middleware.cors import (
    CORSMiddleware
)

from contextlib import asynccontextmanager

from PIL import Image

import io
import structlog

from backend.config import get_settings

from backend.models.vlm_handler import (
    init_vlm,
    get_vlm_handler
)

logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):

    settings = get_settings()

    # Initialize Gemini
    init_vlm(
        settings.GEMINI_API_KEY
    )

    logger.info(
        "application_startup_complete"
    )

    yield

    logger.info(
        "application_shutdown"
    )


app = FastAPI(
    title="AgroAssist API",
    version="1.0.0",
    description="AI Agricultural Assistant",
    lifespan=lifespan
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():

    return {
        "message": "AgroAssist API Running",
        "version": "1.0.0"
    }


@app.post("/api/v1/detect-disease")
async def detect_disease(
    file: UploadFile = File(...)
):

    try:

        contents = await file.read()

        image = Image.open(
            io.BytesIO(contents)
        )

        vlm = get_vlm_handler()

        result = await vlm.detect_disease(
            image
        )

        logger.info(
            "disease_detection_request",
            filename=file.filename
        )

        return {
            "status": "success",
            "result": result
        }

    except Exception as e:

        logger.error(
            "disease_detection_error",
            error=str(e)
        )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@app.post("/api/v1/get-treatment")
async def get_treatment(
    disease: str,
    crop_type: str
):

    try:

        vlm = get_vlm_handler()

        result = await vlm.get_treatment(
            disease,
            crop_type
        )

        return {
            "status": "success",
            "treatment": result["treatment"]
        }

    except Exception as e:

        logger.error(
            "treatment_error",
            error=str(e)
        )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@app.post("/api/v1/ask-question")
async def ask_question(
    question: str
):

    try:

        answer = f"""
🌱 AgroAssist AI Recommendation

Question:
{question}

Possible Causes:
• Nutrient deficiency
• Fungal infection
• Water stress
• Poor crop management

Recommended Actions:
1. Inspect affected plants carefully
2. Apply balanced fertilizers
3. Maintain proper irrigation
4. Remove infected leaves if present
5. Monitor crop growth regularly

Prevention Tips:
• Use certified seeds
• Avoid overwatering
• Follow crop rotation
• Maintain field hygiene

AgroAssist Advice:
Consult local agricultural experts if symptoms spread rapidly.
"""

        return {
            "status": "success",
            "question": question,
            "answer": answer
        }

    except Exception as e:

        logger.error(
            "question_error",
            error=str(e)
        )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        "backend.app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )