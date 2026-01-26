"use client";

import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
  roomId: string;
};

export default function VideoReceiver({ socket, roomId }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pcRef.current = pc;

    pc.ontrack = (e) => {
      if (videoRef.current) {
        videoRef.current.srcObject = e.streams[0];
      }
    };

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("ice-candidate", {
          roomId,
          candidate: e.candidate,
        });
      }
    };

    socket.on("offer", async ({ offer }) => {
      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit("answer", { roomId, answer });
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      await pc.addIceCandidate(candidate);
    });

    return () => {
      socket.off("offer");
      socket.off("ice-candidate");
    };
  }, [socket, roomId]);

  return <video ref={videoRef} autoPlay playsInline className="w-64" />;
}
