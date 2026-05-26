from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel
import torch

from app.config import BASE_MODEL, ADAPTER_PATH

model = None
tokenizer = None
model_loaded = False  

def load_model():
    global model, tokenizer, model_loaded

    tokenizer = AutoTokenizer.from_pretrained(ADAPTER_PATH)

    base_model = AutoModelForCausalLM.from_pretrained(
        BASE_MODEL,
        torch_dtype=torch.float32
    )

    base_model.resize_token_embeddings(len(tokenizer))

    model = PeftModel.from_pretrained(
        base_model,
        ADAPTER_PATH
    )

    model.eval()

    model_loaded = True 