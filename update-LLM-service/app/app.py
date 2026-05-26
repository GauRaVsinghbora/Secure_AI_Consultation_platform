from fastapi import FastAPI
from pydantic import BaseModel

from app.model_loader import load_model, model_loaded
from app.inference import generate_response

app = FastAPI()

load_model()


class ChatRequest(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {"message": "AI Service is running v1.0"}


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": model_loaded
    }


@app.post("/chat")
def chat(req: ChatRequest):

    reply = generate_response(req.message)

    return {
        "response": reply
    }