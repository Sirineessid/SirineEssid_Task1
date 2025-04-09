import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function DrowsinessDetector() {
  const videoRef = useRef();
  const [status, setStatus] = useState("Loading...");
  const EAR_THRESHOLD = 0.25; // Threshold below which eyes are considered closed
  const EAR_CONSEC_FRAMES = 15; // Number of consecutive frames eyes must be below threshold

  let blinkCounter = 0;
  let closedEyesFrames = 0;

  // Eye aspect ratio calculation
  const calculateEAR = (eye) => {
    const A = distance(eye[1], eye[5]);
    const B = distance(eye[2], eye[4]);
    const C = distance(eye[0], eye[3]);
    return (A + B) / (2.0 * C);
  };

  const distance = (pt1, pt2) => {
    return Math.sqrt(
      Math.pow(pt1.x - pt2.x, 2) + Math.pow(pt1.y - pt2.y, 2)
    );
  };

  const detectDrowsiness = async () => {
    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks();

    if (detections && detections.landmarks) {
      const leftEye = detections.landmarks.getLeftEye();
      const rightEye = detections.landmarks.getRightEye();

      const leftEAR = calculateEAR(leftEye);
      const rightEAR = calculateEAR(rightEye);
      const ear = (leftEAR + rightEAR) / 2.0;

      if (ear < EAR_THRESHOLD) {
        closedEyesFrames++;
        if (closedEyesFrames >= EAR_CONSEC_FRAMES) {
          setStatus("😴 Drowsy / Asleep");
        }
      } else {
        if (closedEyesFrames >= EAR_CONSEC_FRAMES) {
          blinkCounter++;
        }
        closedEyesFrames = 0;
        setStatus("😃 Alert");
      }
    }

    requestAnimationFrame(detectDrowsiness);
  };

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
    });
  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // make sure models are hosted publicly
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL);
      startVideo();
    };

    loadModels();
  }, []);

  useEffect(() => {
    videoRef.current.addEventListener("play", () => {
      detectDrowsiness();
    });
  }, []);

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl mb-4">🧠 Meeting Engagement Monitor</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="640"
        height="480"
        className="border rounded-lg mx-auto"
      />
      <div className="mt-4 text-xl font-semibold">
        Status: <span className="text-blue-500">{status}</span>
      </div>
    </div>
  );
}
