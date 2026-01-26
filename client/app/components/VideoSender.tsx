"use client";

import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
  roomId: string;
};

export default function VideoSender({ socket, roomId }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: true,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pcRef.current = pc;

    // Add tracks
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    // ICE candidates
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("ice-candidate", {
          roomId,
          candidate: e.candidate,
        });
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit("offer", { roomId, offer });
  };

  useEffect(() => {
    socket.on("answer", async ({ answer }) => {
      await pcRef.current?.setRemoteDescription(answer);
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      await pcRef.current?.addIceCandidate(candidate);
    });

    return () => {
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [socket]);

  return (
    <div>
      <button onClick={start} className="px-4 py-2 bg-green-500 rounded">
        Start Camera
      </button>

      <video ref={videoRef} autoPlay muted playsInline className="w-64" />
    </div>
  );
}
