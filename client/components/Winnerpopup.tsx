"use client";

type Props = {
  gamestatus: string;
  winstate: string;
  player: "X" | "O" | null;
  onClose: () => void;
};

export default function Winnerpopup({
  gamestatus,
  winstate,
  player,
  onClose,
}: Props) {
  const isDraw = winstate === "draw";
  const isWinner = winstate === player;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-80 rounded-xl bg-zinc-900 p-6 text-center shadow-xl">
        <h2 className="text-2xl font-bold">
          {gamestatus
            ? gamestatus
            : isDraw
              ? "It's a Draw!"
              : isWinner
                ? "You Win 🎉"
                : "You Lose 😢"}
        </h2>

        {!gamestatus && !isDraw && (
          <p className="mt-2 text-sm text-zinc-400">
            Winner: <strong>{winstate}</strong>
          </p>
        )}
        {gamestatus === "Opponent left the game." ? (
          <button
            onClick={onClose}
            className="mt-6 w-full rounded-lg bg-green-500 py-2 font-semibold text-black"
          >
            Close
          </button>
        ) : (
          <button
            onClick={onClose}
            className="mt-6 w-full rounded-lg bg-green-500 py-2 font-semibold text-black"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}
