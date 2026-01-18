type Props = {
  board: (string | null)[];
  makeMove: (i: number) => void;
};

export default function GameBoard({ board, makeMove }: Props) {
  return (
    <div className="mt-8 grid grid-cols-3 gap-3">
      {board.map((cell, i) => (
        <button
          key={i}
          onClick={() => makeMove(i)}
          className="aspect-square rounded-xl bg-zinc-800 text-3xl font-extrabold hover:bg-zinc-700"
          style={{
            color:
              cell === "X" ? "#facc15" : cell === "O" ? "#4ade80" : "white",
          }}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}
