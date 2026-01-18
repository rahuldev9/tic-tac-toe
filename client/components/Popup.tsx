"use client";

import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaTelegramPlane,
  FaWhatsapp,
  FaCopy,
} from "react-icons/fa";

type PopupProps = {
  roomId: string;
  onClose: () => void;
};

export default function Popup({ onClose, roomId }: PopupProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (roomId) setLoading(false);
  }, [roomId]);

  const handleShare = (platform: string) => {
    const shareText = `🎉 Let's play Tic-Tac-Toe!\n\n🔢 Room ID: ${roomId}\n\n👉 Join here: ${window.location.href}`;

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
        shareUrl = `https://t.me/share/url?text=${encodeURIComponent(
          shareText
        )}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href
        )}`;
        break;
    }

    window.open(shareUrl, "_blank");
  };

  const copyRoomId = async () => {
    await navigator.clipboard.writeText(roomId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[320px] rounded-2xl bg-white p-6 shadow-2xl animate-scaleIn">
        {loading ? (
          <p className="text-center text-sm text-gray-500">Creating room...</p>
        ) : (
          <>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 text-gray-400 hover:text-black transition"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold text-gray-900">
              Room Created 🎉
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Share this Room ID with friends
            </p>

            {/* Room ID */}
            <div className="my-4 rounded-xl bg-gray-100 px-4 py-3 text-center text-lg font-mono font-bold text-gray-900">
              {roomId}
            </div>

            {/* Copy Button */}
            <button
              onClick={copyRoomId}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-2.5 text-white font-medium hover:bg-gray-800 transition"
            >
              <FaCopy /> Copy Room ID
            </button>

            {/* Share Buttons */}
            <div className="mt-5 grid grid-cols-4 gap-3">
              <ShareBtn
                icon={<FaFacebookF />}
                color="bg-blue-600"
                onClick={() => handleShare("facebook")}
              />
              <ShareBtn
                icon={<FaTwitter />}
                color="bg-sky-500"
                onClick={() => handleShare("twitter")}
              />
              <ShareBtn
                icon={<FaTelegramPlane />}
                color="bg-blue-500"
                onClick={() => handleShare("telegram")}
              />
              <ShareBtn
                icon={<FaWhatsapp />}
                color="bg-green-500"
                onClick={() => handleShare("whatsapp")}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* Share Button Component */
function ShareBtn({
  icon,
  color,
  onClick,
}: {
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`${color} flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md hover:scale-110 transition`}
    >
      {icon}
    </button>
  );
}
