type Props = {
  gameStarted: boolean;
  input: boolean;
  roomToJoin: string;
  setRoomToJoin: (v: string) => void;
  createRoom: () => void;
  joinRoom: () => void;
  showJoinInput: () => void;
};

export default function GameActions({
  gameStarted,
  input,
  roomToJoin,
  setRoomToJoin,
  createRoom,
  joinRoom,
  showJoinInput,
}: Props) {
  if (gameStarted) return null;

  return (
    <>
      <div className="mt-6 flex flex-col gap-3">
        <button className="Btn" onClick={createRoom}>
          Create Room
        </button>
        <button className="Btn" onClick={showJoinInput}>
          Join With Code
        </button>
      </div>

      {input && (
        <div className="mt-4 flex flex-col items-center gap-3">
          <input
            className="w-full rounded-md bg-zinc-800 px-4 py-2 text-center"
            placeholder="Enter Room Code"
            value={roomToJoin}
            onChange={(e) => setRoomToJoin(e.target.value)}
          />
          <button className="Btn" onClick={joinRoom}>
            Join Room
          </button>
        </div>
      )}
    </>
  );
}
