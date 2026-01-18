type Props = {
  roomId: string;
};

export default function RoomInfo({ roomId }: Props) {
  if (!roomId) return null;

  return (
    <p className="mt-2 text-center text-sm text-zinc-400">
      Room ID: <span className="font-semibold">{roomId}</span>
    </p>
  );
}
