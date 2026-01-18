type Props = {
  playerSymbol: "X" | "O" | null;
  isMyTurn: boolean;
};

export default function TurnIndicator({ playerSymbol, isMyTurn }: Props) {
  if (!playerSymbol) return null;

  return (
    <div className="mt-4 flex justify-between text-sm">
      <p>
        You: <strong>{playerSymbol}</strong>
      </p>
      <p
        className={`font-bold ${isMyTurn ? "text-green-400" : "text-red-400"}`}
      >
        {isMyTurn ? "Your Turn" : "Opponent's Turn"}
      </p>
    </div>
  );
}
