"use client";

import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
  roomId: string;
};

export default function VideoSender({ socket, roomId }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState("");
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 480 },
            frameRate: { ideal: 15, max: 15 },
          },
        });

        if (!mounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = async () => {
            try {
              await videoRef.current?.play();
              setIsVideoReady(true);
            } catch {
              setError("Video play failed");
            }
          };
        }
      } catch (err: any) {
        setError(err.message || "Camera error");
      }
    };

    initCamera();

    return () => {
      mounted = false;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const sendFrame = () => {
    if (!videoRef.current || !canvasRef.current || !isVideoReady) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!video.videoWidth || !video.videoHeight) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        socket.volatile.emit("video-frame", {
          roomId,
          frame: blob,
        });
      },
      "image/jpeg",
      0.4,
    );
  };

  // 🔥 FIX: send at fixed FPS (NO requestAnimationFrame)
  useEffect(() => {
    if (!isVideoReady) return;

    const FPS = 12;
    const interval = setInterval(sendFrame, 1000 / FPS);

    return () => clearInterval(interval);
  }, [roomId, isVideoReady]);

  if (error) {
    return <div className="text-red-600 text-sm">{error}</div>;
  }

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width={160}
        className="rounded"
      />
      <canvas ref={canvasRef} hidden />
    </div>
  );
}
