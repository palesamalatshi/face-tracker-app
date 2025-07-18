'use client';

import { useEffect, useRef, useState } from 'react';

export default function WebcamFeed() {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [permissionError, setPermissionError] = useState(null);
  const [stream, setStream] = useState(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    async function getMediaStream() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error('Permission error:', error);
        setPermissionError('Camera and microphone access was denied.');
      }
    }
    getMediaStream();
  }, []);

  const handleStartRecording = () => {
    if (!stream) return;

    const recordedChunks = [];
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) recordedChunks.push(event.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const videoURL = URL.createObjectURL(blob);
      setRecordedVideo(videoURL);
      localStorage.setItem('lastRecording', videoURL);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
    setTimer(0);
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    clearInterval(timerRef.current);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center py-10 px-6 bg-black bg-opacity-60 rounded-xl shadow-lg mt-10 max-w-3xl mx-auto backdrop-blur-md border border-white border-opacity-20">
      <h2 className="text-3xl font-bold mb-4 text-white">🎥 Face Tracker Recorder</h2>

      {permissionError ? (
        <p className="text-red-400">{permissionError}</p>
      ) : (
        <>
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full max-w-lg rounded-lg border-4 border-pink-300 shadow-lg"
            />
            {isRecording && (
              <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 text-sm rounded shadow">
                ⏺ {formatTime(timer)}
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-6">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="bg-pink-400 hover:bg-pink-500 text-white font-semibold px-6 py-2 rounded-xl shadow-lg"
              >
                Start Recording
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg"
              >
                Stop Recording
              </button>
            )}
          </div>
        </>
      )}

      {recordedVideo && (
        <div className="mt-10 w-full">
          <h3 className="text-xl font-semibold mb-3 text-white">🎬 Preview</h3>
          <video controls src={recordedVideo} className="w-full max-w-lg rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
}
