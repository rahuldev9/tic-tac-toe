"use client";

import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
};

export default function LiveViewer({ socket }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const lastUrl = useRef<string | null>(null);

  useEffect(() => {
    socket.on("video-frame", (frame: ArrayBuffer) => {
      if (lastUrl.current) {
        URL.revokeObjectURL(lastUrl.current);
      }

      const blob = new Blob([frame], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      lastUrl.current = url;

      if (imgRef.current) {
        imgRef.current.src = url;
      }
    });

    return () => {
      socket.off("video-frame");
      if (lastUrl.current) URL.revokeObjectURL(lastUrl.current);
    };
  }, []);

  return <img ref={imgRef} width={160} />;
}
