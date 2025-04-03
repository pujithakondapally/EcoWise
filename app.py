import cv2
import torch
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import time

def capture_image(filename='captured_image.jpg'):
    # Open the webcam
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return None
    
    print("Capturing image... Please wait.")
    time.sleep(2)  # Allow camera to adjust
    
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(filename, frame)
        print(f"Image captured and saved as {filename}")
    else:
        print("Failed to capture image")
        filename = None
    
    cap.release()
    # cv2.destroyAllWindows()
    return filename

# Load model and processor
processor = AutoImageProcessor.from_pretrained("watersplash/waste-classification")
model = AutoModelForImageClassification.from_pretrained("watersplash/waste-classification")

def classify_image(image_path):
    if image_path is None:
        print("No image to classify.")
        return
    
    image = Image.open(image_path).convert("RGB")
    inputs = processor(images=image, return_tensors="pt")
    
    with torch.no_grad():
        outputs = model(**inputs)
    logits = outputs.logits
    predicted_class = logits.argmax(-1).item()
    print(f"Predicted class: {predicted_class}")

# Capture and classify image
image_path = capture_image()
classify_image(image_path)
