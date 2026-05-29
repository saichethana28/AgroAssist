import pytest
from backend.utils.vector_db import VectorDB
import tempfile
import shutil


@pytest.fixture
def temp_db_path():

    temp_dir = tempfile.mkdtemp()

    yield temp_dir

    shutil.rmtree(temp_dir)


def test_vector_db_init(
    temp_db_path
):

    db = VectorDB(temp_db_path)

    assert db is not None
    assert db.index is not None


def test_add_documents(
    temp_db_path
):

    db = VectorDB(temp_db_path)

    docs = [
        {
            "id": "test_1",
            "text": "Rice blast disease",
            "crop": "Rice",
            "disease": "Blast"
        }
    ]

    db.add_documents(docs)

    assert len(db.metadata) == 1


def test_search(
    temp_db_path
):

    db = VectorDB(temp_db_path)

    docs = [
        {
            "id": "1",
            "text": "Rice blast disease symptoms"
        },
        {
            "id": "2",
            "text": "Wheat rust prevention"
        }
    ]

    db.add_documents(docs)

    results = db.search(
        "rice disease"
    )

    assert len(results) > 0