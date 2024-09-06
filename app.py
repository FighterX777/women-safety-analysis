from flask import Flask, render_template, Response
import cv2
import numpy as np
from age_gender_detection import AgeGenderDetector
import gdown

url = 'https://drive.google.com/u/0/uc?id=1UmQZBioHesV4rynJkNugQZFAN15SiPff&export=download'
output = 'gender_net.caffemodel'
gdown.download(url, output, quiet=False)

url = 'https://drive.google.com/u/0/uc?id=1Y9q8ybAgeulODUKCSmTD6LiKZCO5x1RB&export=download'
output = 'age_net.caffemodel'
gdown.download(url, output, quiet=False)

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
    app.run(debug=True,threaded=False,host="0.0.0.0")
