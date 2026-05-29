"""
Load sample crop disease data into vector DB
"""

import sys
import os

# Add project root to Python path
sys.path.append(
    os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            '..'
        )
    )
)

from backend.utils.vector_db import (
    init_vector_db,
    get_vector_db
)

# Sample agricultural knowledge base
SAMPLE_DATA = [

    {
        "id": "rice_blast_1",
        "crop": "Rice",
        "disease": "Rice Blast",

        "text": """
        Rice Blast is a fungal disease
        affecting rice plants.

        Symptoms:
        Gray or brown lesions on leaves.

        Treatment:
        Use fungicides,
        resistant varieties,
        and proper spacing.
        """,

        "treatment": """
        Fungicide application,
        resistant varieties,
        proper spacing
        """
    },

    {
        "id": "tomato_early_blight_2",
        "crop": "Tomato",
        "disease": "Early Blight",

        "text": """
        Early Blight causes
        concentric brown rings
        on tomato leaves.

        Treatment:
        Remove infected leaves,
        apply fungicides,
        avoid overhead watering.
        """,

        "treatment": """
        Mancozeb spray,
        pruning,
        proper irrigation
        """
    },

    {
        "id": "wheat_rust_3",
        "crop": "Wheat",
        "disease": "Wheat Rust",

        "text": """
        Wheat Rust produces
        orange or brown pustules
        on leaves.

        Prevention:
        Crop rotation,
        resistant varieties,
        fungicide spraying.
        """,

        "treatment": """
        Propiconazole fungicide,
        resistant varieties
        """
    }

]


def load_sample_data():

    init_vector_db("./data/vector_db")

    vector_db = get_vector_db()

    vector_db.add_documents(
        SAMPLE_DATA
    )

    print(
        f"Loaded {len(SAMPLE_DATA)} documents successfully."
    )


if __name__ == "__main__":

    load_sample_data()