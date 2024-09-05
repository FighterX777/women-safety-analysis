import cv2
import numpy as np
from tensorflow.keras.models import load_model

class AgeGenderDetector:
    def __init__(self):
        # Load the age and gender detection models
        self.ageNet = cv2.dnn.readNet("age_net.caffemodel", "age_deploy.prototxt")
        self.genderNet = cv2.dnn.readNet("gender_net.caffemodel", "gender_deploy.prototxt")
        self.faceNet = cv2.dnn.readNet("opencv_face_detector_uint8.pb", "opencv_face_detector.pbtxt")

        # Load the age and gender lists
        self.ageList = ['(0-2)', '(4-6)', '(8-12)', '(15-20)', '(25-32)', '(38-43)', '(48-53)', '(60-100)']
        self.genderList = ['Male', 'Female']

        # Initialize the camera
        self.cap = cv2.VideoCapture(0)

    def getFaceBox(self, net, frame, conf_threshold=0.7):
        frameOpencvDnn = frame.copy()
        frameHeight = frameOpencvDnn.shape[0]
        frameWidth = frameOpencvDnn.shape[1]
        blob = cv2.dnn.blobFromImage(frameOpencvDnn, 1.0, (300, 300), [104, 117, 123], True, False)

        net.setInput(blob)
        detections = net.forward()
        bboxes = []
        for i in range(detections.shape[2]):
            confidence = detections[0, 0, i, 2]
            if confidence > conf_threshold:
                x1 = int(detections[0, 0, i, 3] * frameWidth)
                y1 = int(detections[0, 0, i, 4] * frameHeight)
                x2 = int(detections[0, 0, i, 5] * frameWidth)
                y2 = int(detections[0, 0, i, 6] * frameHeight)
                bboxes.append([x1, y1, x2, y2])
                cv2.rectangle(frameOpencvDnn, (x1, y1), (x2, y2), (0, 255, 0), int(round(frameHeight/150)), 8)
        return frameOpencvDnn, bboxes

    def generate_frames(self):
        while True:
            # Read a frame from the camera
            ret, frame = self.cap.read()

            if not ret:
                break

            # Detect faces in the frame
            frameFace, bboxes = self.getFaceBox(self.faceNet, frame)

            # Loop through the detected faces
            for bbox in bboxes:
                # Extract the face from the frame
                face = frame[max(0,bbox[1]-20):min(bbox[3]+20,frame.shape[0]-1),max(0,bbox[0]-20):min(bbox[2]+20, frame.shape[1]-1)]

                # Detect the age and gender of the face
                blob = cv2.dnn.blobFromImage(face, 1.0, (227, 227), (78.4263377603, 87.7689143744, 114.895847746), swapRB=False)
                self.genderNet.setInput(blob)
                genderPreds = self.genderNet.forward()
                gender = self.genderList[genderPreds[0].argmax()]

                self.ageNet.setInput(blob)
                agePreds = self.ageNet.forward()
                age = self.ageList[agePreds[0].argmax()]

                # Draw the age and gender on the frame
                label = "{},{}".format(gender, age)
                cv2.putText(frameFace, label, (bbox[0], bbox[1]-10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2, cv2.LINE_AA)

            # Encode the frame as JPEG and yield it
            ret, jpeg = cv2.imencode('.jpg', frameFace)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n\r\n')