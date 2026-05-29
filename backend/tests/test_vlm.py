import pytest
from backend.models.vlm_handler import VLMHandler
from PIL import Image
import numpy as np


@pytest.fixture
def dummy_image():

    img_array = np.random.randint(
        0,
        255,
        (100, 100, 3),
        dtype=np.uint8
    )

    return Image.fromarray(img_array)


@pytest.mark.asyncio
async def test_vlm_handler_init():

    handler = VLMHandler(
        api_key="test_key"
    )

    assert handler is not None