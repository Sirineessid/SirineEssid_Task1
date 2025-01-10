# SirineEssid_Task1
This project detects and counts eye blinks in real-time using video processing and computer vision techniques. It uses the Eye Aspect Ratio (EAR) to identify blinks from a webcam feed or pre-recorded videos. This tool can be applied in areas such as fatigue monitoring for drivers, gaming applications...

# Features
Real-time face and eye detection.
Blink detection based on the EAR (Eye Aspect Ratio).
Accurate blink counting over a defined period.
Supports both live webcam feeds and video files.
## What are facial landmarks that dlib detects:
The dlib library can be used to detect a face in an image and then find 68 facial landmarks on the detected face.
![image](https://github.com/user-attachments/assets/94c5e9b8-6a5c-4fa1-9ff9-ada5fd705c90)

## Our Use Case :
Each eye is represented using 6 landmarks points:

![image](https://github.com/user-attachments/assets/e7235360-1345-4b31-8dc8-154aed7ba2cd)


 
## EAR 
This method is very simple, efficient, and doesn’t require anything like image processing. Basically, this ratio gives us a certain relation between the horizontal and vertical measurements of the eye. This is the equation to calculate the EAR using the six parameters of the eye :
![image](https://github.com/user-attachments/assets/dcf07c3b-5547-482a-9f7a-2ac4224b5d15)
![image](https://github.com/user-attachments/assets/46eb5f03-c520-40c8-ae81-84f19c252977)




## Ressources
https://medium.com/analytics-vidhya/eye-aspect-ratio-ear-and-drowsiness-detector-using-dlib-a0b2c292d706
https://www.researchgate.net/figure/The-six-landmarks-taken-into-consideration-to-predict-the-eye-attributes-using_fig5_351144840

