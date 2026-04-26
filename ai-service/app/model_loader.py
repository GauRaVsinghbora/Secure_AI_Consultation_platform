from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel
import torch

from app.config import BASE_MODEL, ADAPTER_PATH

model = None
tokenizer = None


def load_model():

    global model, tokenizer   # IMPORTANT

    tokenizer = AutoTokenizer.from_pretrained(ADAPTER_PATH)

    base_model = AutoModelForCausalLM.from_pretrained(
        BASE_MODEL,
        torch_dtype=torch.float16,
        device_map="auto"
    )

    base_model.resize_token_embeddings(len(tokenizer))

    model = PeftModel.from_pretrained(
        base_model,
        ADAPTER_PATH
    )

    model.eval()