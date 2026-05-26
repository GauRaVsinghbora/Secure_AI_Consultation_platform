from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel
import torch

from app.config import BASE_MODEL, ADAPTER_PATH

model = None
tokenizer = None
model_loaded = False  

def load_model():
    global model, tokenizer, model_loaded

    print("Loading tokenizer...")
    tokenizer = AutoTokenizer.from_pretrained(ADAPTER_PATH)

    print("Loading base model (Mistral)...")

    base_model = AutoModelForCausalLM.from_pretrained(
        BASE_MODEL,
        device_map="auto",
        load_in_4bit=True
    )

    print("Loading LoRA adapter...")

    model = PeftModel.from_pretrained(
        base_model,
        ADAPTER_PATH
    )

    model.eval()

    model_loaded = True
    print("Model loaded successfully!")