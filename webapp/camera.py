import numpy as np
import argparse
import imutils
import time
import cv2
import tensorflow.keras
np.set_printoptions(suppress=True)

model = tensorflow.keras.models.load_model('keras_model.h5')

ap = argparse.ArgumentParser()

ap.add_argument("-c", "--confidence", type=float, default=0.3,
	help="minimum probability to filter weak detections")
args = vars(ap.parse_args())

print("[INFO] loading model...")
net = cv2.dnn.readNetFromCaffe("deploy.prototxt.txt", "res10_300x300_ssd_iter_140000.caffemodel")

class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)
    
    def __del__(self):
        self.video.release()
    
    def get_frame(self):
        success, frame = self.video.read()
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
            cv2.rectangle(frame, (startX, startY), (endX, endY), color, 2)
            cv2.putText(frame, text, (startX, y), cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 2)
        	
        ret, jpeg = cv2.imencode('.jpg', frame)
        return jpeg.tobytes()
