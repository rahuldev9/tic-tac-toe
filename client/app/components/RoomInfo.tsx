import { Copy, Check } from "lucide-react";
import { useState } from "react";

type Props = {
  roomId: string;
};

export default function RoomInfo({ roomId }: Props) {
  const [copied, setCopied] = useState(false);

  if (!roomId) return null;

  const copyRoomId = async () => {
    await navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <p className="mt-2 flex items-center justify-center gap-2 text-sm text-zinc-400">
      <span>
        Room ID: <span className="font-semibold text-white">{roomId}</span>
      </span>

      <button
        onClick={copyRoomId}
        aria-label="Copy room id"
        className="rounded-md p-1 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
      >
        {copied ? (
          <Check size={14} className="text-green-400" />
        ) : (
          <Copy size={14} />
        )}
      </button>
    </p>
  );
}
