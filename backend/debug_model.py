import torch
import os
import sys
def check():
    print(f"Python version: {sys.version}")
    print(f"PyTorch version: {torch.__version__}")
    print(f"CUDA available: {torch.cuda.is_available()}")
    if torch.cuda.is_available():
        print(f"CUDA Device: {torch.cuda.get_device_name(0)}")
        print(f"VRAM: {torch.cuda.get_memory_info(0).total / (1024**3):.2f} GB")
    model_dir = os.path.join(os.getcwd(), "..", "model")
    print(f"Model dir: {model_dir}")
    print(f"Model dir exists: {os.path.exists(model_dir)}")
    if os.path.exists(model_dir):
        print(f"Files in model dir: {os.listdir(model_dir)}")
if __name__ == "__main__":
    check()