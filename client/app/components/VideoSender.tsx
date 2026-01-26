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
  const [error, setError] = useState<string>("");
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initCamera = async () => {
      try {
        // Check if API is available
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error(
            "Camera API not available. Please use HTTPS or check browser compatibility.",
          );
        }

        // Mobile-optimized constraints
        const constraints = {
          video: {
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 480 },
            frameRate: { ideal: 15, max: 30 },
          },
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        if (!mounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.onloadedmetadata = () => {
            if (mounted && videoRef.current) {
              videoRef.current
                .play()
                .then(() => {
                  setIsVideoReady(true);
                })
                .catch((err) => {
                  console.error("Video play error:", err);
                  setError("Failed to play video");
                });
            }
          };
        }
      } catch (err) {
        console.error("Camera access error:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown camera error");
        }
      }
    };

    initCamera();

    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const sendFrame = () => {
    if (!videoRef.current || !canvasRef.current || !isVideoReady) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video.videoWidth === 0 || video.videoHeight === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        socket.emit("video-frame", {
          roomId,
          frame: blob,
        });
      },
      "image/jpeg",
      0.6,
    );
  };

  useEffect(() => {
    if (!isVideoReady) return;

    let active = true;
    let frameId: number;

    const loop = () => {
      if (!active) return;
      sendFrame();
      frameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      active = false;
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [roomId, isVideoReady]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded text-sm">
        <p className="font-semibold">Camera Error:</p>
        <p>{error}</p>
        <p className="mt-2 text-xs">
          Make sure you're using HTTPS and have granted camera permissions.
        </p>
      </div>
    );
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
