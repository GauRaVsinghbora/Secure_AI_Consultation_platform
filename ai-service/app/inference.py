import torch
import app.model_loader as model_loader

def generate_response(message):

    if model_loader.model is None or model_loader.tokenizer is None:
        raise RuntimeError("Model not loaded")

    prompt = f"User: {message}\nAssistant:"

    inputs = model_loader.tokenizer(prompt, return_tensors="pt").to(model_loader.model.device)

    outputs = model_loader.model.generate(
        **inputs,
        max_new_tokens=200,
        temperature=0.7,
        do_sample=True
    )

    response = model_loader.tokenizer.decode(outputs[0], skip_special_tokens=True)

    response = response.split("Assistant:")[-1].strip()

    return response