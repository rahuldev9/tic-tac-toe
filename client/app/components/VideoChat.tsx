"use client";

import { useRef, useState } from "react";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
  roomId: string;
};

export default function VideoSender({ socket, roomId }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [started, setStarted] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user", // front camera
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play(); // 👈 REQUIRED on mobile
      }

      setStarted(true);
      startStreaming();
    } catch (err) {
      console.error("Camera error:", err);
      alert("Camera permission denied or not supported.");
    }
  };

  const startStreaming = () => {
    const sendFrame = () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          socket.emit("video-frame", { roomId, frame: blob });
        },
        "image/jpeg",
        0.6,
      );

      requestAnimationFrame(sendFrame);
    };

    requestAnimationFrame(sendFrame);
  };

  return (
    <div>
      {!started && (
        <button
          onClick={startCamera}
          className="px-4 py-2 bg-green-500 text-black rounded"
        >
          Start Camera
        </button>
      )}

      <video ref={videoRef} autoPlay muted playsInline className="hidden" />

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
