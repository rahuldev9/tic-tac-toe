"use client";

import React, { useEffect, useState } from "react";

type PopupProps = {
  roomId: string;
  onClose: () => void;
};

export default function Popup({ roomId, onClose }: PopupProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (roomId) setLoading(false);
  }, [roomId]);

  /* ---------------- SHARE ---------------- */

  const handleShare = (platform: string, event?: React.MouseEvent) => {
    event?.preventDefault();

    const shareText = `🎉 Let's play Tic-Tac-Toe! 🎮

🚀 Join my game now!
🔢 Room ID: ${roomId}

🔥 Play here: ${window.location.href}`;

    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          shareText
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
          window.location.href
        )}&text=${encodeURIComponent(shareText)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href
        )}`;
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: "Tic Tac Toe Room",
            text: shareText,
            url: window.location.href,
          });
        }
    }

    if (shareUrl) window.open(shareUrl, "_blank");
  };

  /* ---------------- COPY ---------------- */

  const copyRoomId = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await navigator.clipboard.writeText(roomId);
    const btn = e.currentTarget;
    btn.innerText = "Copied!";
    setTimeout(() => {
      btn.innerText = "Copy";
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[320px] rounded-xl bg-white p-6 text-center shadow-xl">
        {/* Close */}
        {!loading && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-gray-500 hover:text-black"
          >
            ✕
          </button>
        )}

        {/* Loader */}
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-4 animate-pulse rounded bg-zinc-400"
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-800">Room Created 🎉</h2>

            <p className="mt-2 text-sm text-gray-600">
              Share this Room ID with your friend
            </p>

            <p className="mt-4 text-2xl font-extrabold tracking-widest text-black">
              {roomId}
            </p>

            {/* Copy */}
            <button
              onClick={copyRoomId}
              className="mt-4 w-full rounded-lg bg-black py-2 font-semibold text-white hover:bg-zinc-800 transition"
            >
              Copy
            </button>

            {/* Social */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={(e) => handleShare("facebook", e)}
                className="rounded-full bg-blue-600 p-3 text-white hover:scale-110 transition"
              >
                f
              </button>

              <button
                onClick={(e) => handleShare("twitter", e)}
                className="rounded-full bg-sky-500 p-3 text-white hover:scale-110 transition"
              >
                x
              </button>

              <button
                onClick={(e) => handleShare("telegram", e)}
                className="rounded-full bg-blue-400 p-3 text-white hover:scale-110 transition"
              >
                tg
              </button>

              <button
                onClick={(e) => handleShare("whatsapp", e)}
                className="rounded-full bg-green-500 p-3 text-white hover:scale-110 transition"
              >
                wa
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
