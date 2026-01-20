type Props = {
  board: (string | null)[];
  makeMove: (i: number) => void;
};

export default function GameBoard({ board, makeMove }: Props) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-2 w-fit mx-auto">
      {board.map((cell, i) => (
        <button
          key={i}
          onClick={() => makeMove(i)}
          disabled={cell !== null}
          className={`
            h-20 w-20
            rounded-lg
            bg-zinc-900
            text-2xl font-bold
            transition-all
            hover:bg-zinc-800
            active:scale-95
            disabled:cursor-default
            disabled:hover:bg-zinc-900
          `}
          style={{
            color:
              cell === "X" ? "#facc15" : cell === "O" ? "#4ade80" : "#e5e7eb",
          }}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}
