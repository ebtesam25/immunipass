import base64
import io
import cv2
from imageio import imread
import matplotlib.pyplot as plt
import numpy as np
import argparse
import imutils
import time
from flask import Flask, request
app = Flask(__name__)
import json
from flask_cors import CORS

CORS(app)

import tensorflow.keras
np.set_printoptions(suppress=True)

model = tensorflow.keras.models.load_model('keras_model.h5')

ap = argparse.ArgumentParser()

ap.add_argument("-c", "--confidence", type=float, default=0.3,
	help="minimum probability to filter weak detections")
args = vars(ap.parse_args())

print("[INFO] loading model...")
net = cv2.dnn.readNetFromCaffe("deploy.prototxt.txt", "res10_300x300_ssd_iter_140000.caffemodel")

"""
filename = "image.jpg"
with open(filename, "rb") as fid:
    data = fid.read()

b64_bytes = base64.b64encode(data)

b64_string = b64_bytes.decode()
file1 = open("input.txt", "a")
file1.write(b64_string)
"""

def preprocess(string):
    img = imread(io.BytesIO(base64.b64decode(string)))
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    return img

def predict(string):
    final_status = 0
    frame = preprocess(string)
    frame = imutils.resize(frame, width=1080)
    (h, w) = frame.shape[:2]
    blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)), 1.0, (300, 300), (104.0, 177.0, 123.0))

    net.setInput(blob)
    detections = net.forward()
    for i in range(0, detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence < args["confidence"]:
            continue
        box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
        (startX, startY, endX, endY) = box.astype("int")
        text = "{:.2f}%".format(confidence * 100)
        y = startY - 10 if startY - 10 > 10 else startY + 10
        face = frame[startY - 50:endY + 50, startX - 50:endX + 50]
        face = cv2.resize(frame, (224, 224))
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        image_array = np.asarray(face)
        normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
        data[0] = normalized_image_array
        prediction = model.predict(data)
        if prediction[0][0] > prediction[0][1]:
            text = "MASK " + str(prediction[0][0] * 100)
            color = (0, 255, 0)
        else:
            text = "NO MASK" + str(prediction[0][1] * 100)
            color = (0, 0, 255)
            final_status = 1
        cv2.rectangle(frame, (startX, startY), (endX, endY), color, 2)
        cv2.putText(frame, text, (startX, y), cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 2)
    return {"image":base64.b64encode(cv2.imencode('.jpg', frame)[1]).decode(), "mask":final_status}


@app.route('/', methods=["GET", "POST"])
def predict_endpoint():
    data = request.json

    return predict(data["image"])

if __name__ == "__main__":
    app.run()