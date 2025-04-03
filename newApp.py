# from flask import Flask, request, jsonify
# import cv2
# import torch
# from transformers import AutoImageProcessor, AutoModelForImageClassification
# from PIL import Image
# import time
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Load model and processor
# processor = AutoImageProcessor.from_pretrained("watersplash/waste-classification")
# model = AutoModelForImageClassification.from_pretrained("watersplash/waste-classification")

# def capture_image(filename='captured_image.jpg'):
#     cap = cv2.VideoCapture(0)
#     if not cap.isOpened():
#         return None
    
#     time.sleep(2)
#     ret, frame = cap.read()
#     if ret:
#         cv2.imwrite(filename, frame)
#     cap.release()
#     return filename if ret else None

# @app.route('/capture', methods=['GET'])
# def capture():
#     image_path = capture_image()
#     if not image_path:
#         return jsonify({"error": "Failed to capture image"}), 500
#     return jsonify({"image_path": image_path})

# @app.route('/classify', methods=['POST'])
# def classify():
#     data = request.json
#     image_path = data.get("image_path")

#     if not image_path:
#         return jsonify({"error": "No image provided"}), 400
    
#     image = Image.open(image_path).convert("RGB")
#     inputs = processor(images=image, return_tensors="pt")

#     with torch.no_grad():
#         outputs = model(**inputs)
#     predicted_class = outputs.logits.argmax(-1).item()

#     return jsonify({"predicted_class": predicted_class})

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  # Import CORS
import cv2
import torch
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import os
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Directory for storing captured images
IMAGE_FOLDER = os.path.abspath(os.getcwd())
CAPTURED_IMAGE = "captured_image.jpg"

def capture_image(filename='captured_image.jpg'):
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        return None
    
    time.sleep(2)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(filename, frame)
        cv2.imwrite("C:/Users/keert/BVRIT/EcoWise/ecowise/ecowise/public/image.jpg",frame)
    cap.release()
    return filename if ret else None

# @app.route('/static/<path:filename>')
# def serve_static(filename):
#     return send_from_directory(IMAGE_FOLDER, filename)

@app.route('/capture', methods=['GET'])
def capture():
    image_path = capture_image()
    if not image_path:
        return jsonify({"error": "Failed to capture image"}), 500
    return jsonify({"image_path": image_path})

@app.route('/classify', methods=['POST'])
def classify():
    data = request.json
    image_path = CAPTURED_IMAGE  # Always classify the latest captured image

    if not os.path.exists(image_path):
        return jsonify({"error": "Image not found"}), 400

    processor = AutoImageProcessor.from_pretrained("watersplash/waste-classification")
    model = AutoModelForImageClassification.from_pretrained("watersplash/waste-classification")

    image = Image.open(image_path).convert("RGB")
    inputs = processor(images=image, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)
    logits = outputs.logits
    predicted_class = logits.argmax(-1).item()

    return jsonify({"predicted_class": predicted_class})

if __name__ == '__main__':
    app.run(debug=True)
