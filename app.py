from flask import Flask, render_template, Response
import cv2
import numpy as np
from age_gender_detection import AgeGenderDetector

app = Flask(__name__)

# Initialize the age and gender detector
detector = AgeGenderDetector()

# Define the route for the webpage
@app.route('/')
def index():
    return render_template('index.html')

# Define the route for the video feed
@app.route('/video_feed')
def video_feed():
    print("Video feed route called")
    return Response(detector.generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)