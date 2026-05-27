import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import pickle
import os
import structlog

logger = structlog.get_logger()


class VectorDB:

    def __init__(
        self,
        db_path: str,
        model_name: str = (
            "sentence-transformers/all-MiniLM-L6-v2"
        )
    ):

        self.db_path = db_path

        self.model = SentenceTransformer(
            model_name
        )

        self.embedding_dim = (
            self.model.get_sentence_embedding_dimension()
        )

        os.makedirs(db_path, exist_ok=True)

        self.index_path = os.path.join(
            db_path,
            "index.faiss"
        )

        self.metadata_path = os.path.join(
            db_path,
            "metadata.pkl"
        )

        self.index = None
        self.metadata = []

        self._load_or_init()

    def _load_or_init(self):

        if os.path.exists(self.index_path):

            self.index = faiss.read_index(
                self.index_path
            )

            with open(
                self.metadata_path,
                "rb"
            ) as f:

                self.metadata = pickle.load(f)

            logger.info(
                "vector_db_loaded",
                num_vectors=self.index.ntotal
            )

        else:

            self.index = faiss.IndexFlatL2(
                self.embedding_dim
            )

            self.metadata = []

            logger.info(
                "vector_db_initialized"
            )

    def add_documents(self, documents):

        texts = [
            doc["text"]
            for doc in documents
        ]

        embeddings = self.model.encode(
            texts,
            convert_to_numpy=True
        )

        self.index.add(
            embeddings.astype(np.float32)
        )

        for doc in documents:

            self.metadata.append({
                "id": doc.get("id"),
                "text": doc.get("text"),
                "crop": doc.get("crop"),
                "disease": doc.get("disease"),
                "treatment": doc.get("treatment")
            })

        self._save()

        logger.info(
            "documents_added",
            count=len(documents)
        )

    def search(
        self,
        query: str,
        k: int = 5
    ):

        if self.index.ntotal == 0:
            return []

        query_embedding = self.model.encode(
            [query],
            convert_to_numpy=True
        )

        distances, indices = self.index.search(
            query_embedding.astype(np.float32),
            k
        )

        results = []

        for idx, distance in zip(
            indices[0],
            distances[0]
        ):

            if 0 <= idx < len(self.metadata):

                results.append({
                    "text": self.metadata[idx]["text"],
                    "distance": float(distance),
                    "metadata": self.metadata[idx]
                })

        logger.info(
            "vector_search_completed",
            query=query[:50],
            results_count=len(results)
        )

        return results

    def _save(self):

        faiss.write_index(
            self.index,
            self.index_path
        )

        with open(
            self.metadata_path,
            "wb"
        ) as f:

            pickle.dump(
                self.metadata,
                f
            )


# Global singleton
_vector_db = None


def init_vector_db(db_path: str):

    global _vector_db

    _vector_db = VectorDB(db_path)


def get_vector_db():

    return _vector_db