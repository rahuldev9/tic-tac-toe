type Props = {
  playerSymbol: "X" | "O" | null;
  isMyTurn: boolean;
  nextPlayerName: string;
};

export default function TurnIndicator({
  playerSymbol,
  isMyTurn,
  nextPlayerName,
}: Props) {
  if (!playerSymbol) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div
        className={`rounded-xl px-4 py-3 shadow-lg backdrop-blur-md border
          ${
            isMyTurn
              ? "bg-green-500/10 border-green-400/30"
              : "bg-red-500/10 border-red-400/30"
          }`}
      >
        <div className="flex items-center gap-3">
          {/* Player Symbol */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white font-bold">
            {playerSymbol}
          </div>

          {/* Turn Info */}
          <div className="flex flex-col text-sm leading-tight">
            <span
              className={`font-semibold ${
                isMyTurn ? "text-green-400" : "text-red-400"
              }`}
            >
              <p>{`${nextPlayerName}'s turn`}</p>
              {/* <p>
                {isMyTurn
                  ? "Your turn"
                  : `${nextPlayerName ?? "Opponent"}'s turn`}
              </p> */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
