import { useState } from "react";
import { Copy, Check } from "lucide-react";

type Props = {
  gameStarted: boolean;

  roomToJoin: string;
  roomCode: string | null;

  setRoomToJoin: (v: string) => void;
  createRoom: () => void;
  joinRoom: () => void;
};

export default function GameActions({
  gameStarted,

  roomToJoin,
  roomCode,
  setRoomToJoin,
  createRoom,
  joinRoom,
}: Props) {
  const [ShowInput, setShowInput] = useState(false);
  const [copied, setCopied] = useState(false);
  if (gameStarted) return null;

  if (roomCode) {
    const copyToClipboard = async () => {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);

      setTimeout(() => setCopied(false), 1500);
    };

    return (
      <div className="mx-auto mt-10 w-full max-w-sm rounded-2xl bg-zinc-900 p-6 text-center shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Waiting for Friend…
        </h2>

        <p className="mb-4 text-zinc-400">
          Share this room code with your friend
        </p>

        <div className="mb-6 flex items-center justify-between rounded-xl bg-zinc-800 px-4 py-3 font-mono text-lg tracking-widest text-white">
          <span>{roomCode}</span>

          <button
            onClick={copyToClipboard}
            className="ml-3 rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
            aria-label="Copy room code"
          >
            {copied ? (
              <Check size={18} className="text-green-400" />
            ) : (
              <Copy size={18} />
            )}
          </button>
        </div>

        <p className="text-sm text-zinc-500">
          Do <span className="font-medium text-white">not</span> close or
          refresh this tab
        </p>
      </div>
    );
  }

  /* 🎮 DEFAULT MENU */
  return (
    <div className="mx-auto mt-10 w-full max-w-sm rounded-2xl bg-zinc-900 p-6 shadow-lg">
      <h2 className="mb-6 text-center text-xl font-semibold text-white">
        Multiplayer Room
      </h2>

      {!ShowInput && (
        <div className="flex flex-col gap-3">
          <button
            onClick={createRoom}
            className="rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-500 active:scale-[0.98]"
          >
            Create Room
          </button>

          <button
            onClick={() => setShowInput(true)}
            className="rounded-xl border border-zinc-700 py-3 font-medium text-zinc-300 transition hover:bg-zinc-800 active:scale-[0.98]"
          >
            Join With Code
          </button>
        </div>
      )}

      {ShowInput && (
        <div className="mt-6 flex flex-col gap-3">
          <input
            className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-center text-white placeholder-zinc-400 focus:border-indigo-500 focus:outline-none"
            placeholder="Enter Room Code"
            value={roomToJoin}
            onChange={(e) => setRoomToJoin(e.target.value)}
          />

          <button
            onClick={joinRoom}
            className="rounded-xl bg-emerald-600 py-3 font-medium text-white transition hover:bg-emerald-500 active:scale-[0.98]"
          >
            Join Room
          </button>
          <button
            onClick={() => setShowInput(false)}
            className="rounded-xl border border-zinc-700 py-3 font-medium text-zinc-300 transition hover:bg-zinc-800 active:scale-[0.98]"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
