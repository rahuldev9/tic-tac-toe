type Player = {
  name: string;
  gender: string;
  profile?: string;
};

type Props = {
  players: Player[];
};

export default function PlayersPanel({ players }: Props) {
  if (players.length !== 2) return null;

  return (
    <div className="mt-6 flex items-center justify-center gap-6">
      {players.map((p, i) => (
        <div
          key={i}
          className="flex flex-col items-center rounded-xl bg-white/5 p-3"
        >
          <img
            src={
              p.profile
                ? p.profile
                : p.gender === "male"
                ? "/male.png"
                : "/female.png"
            }
            className="h-14 w-14 rounded-full"
          />
          <p className="mt-1 text-sm font-semibold">{p.name}</p>
          <span className="text-xs text-zinc-400">{i === 0 ? "X" : "O"}</span>
        </div>
      ))}
    </div>
  );
}
