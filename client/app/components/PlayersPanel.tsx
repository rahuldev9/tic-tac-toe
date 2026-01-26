import { useEffect, useState } from "react";

type Player = {
  name: string;
  gender: string;
  profile?: string;
};

type LastReaction = {
  player: string;
  emoji: string;
};

type Props = {
  players: Player[];
  lastmessage?: {
    player: string;
    text: string;
  };
  emoji?: LastReaction;
  isChatOpen: boolean;
  playername?: string;
  TiggerChat: () => void;
};

export default function PlayersPanel({
  players,
  lastmessage,
  emoji,
  playername,
  isChatOpen,
  TiggerChat,
}: Props) {
  const [showMessage, setShowMessage] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const [messageConsumed, setMessageConsumed] = useState(false);

  useEffect(() => {
    if (!emoji) return;
    setShowMessage(false);

    setShowEmoji(true);
    const timer = setTimeout(() => setShowEmoji(false), 2000);

    return () => clearTimeout(timer);
  }, [emoji?.emoji, emoji?.player]);

  // 🔔 New message arrives

  useEffect(() => {
    if (!lastmessage) return;

    setShowMessage(true);
    setMessageConsumed(false);

    // Chat open → auto-hide after 2s
    if (isChatOpen) {
      const timer = setTimeout(() => {
        setShowMessage(false);
        setMessageConsumed(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [lastmessage, isChatOpen]);

  // 🚪 Chat opened manually
  useEffect(() => {
    if (isChatOpen) {
      setShowMessage(false);
      setMessageConsumed(true);
    }
  }, [isChatOpen]);

  const handleMessageClick = () => {
    setShowMessage(false);
    setMessageConsumed(true);
    TiggerChat();
  };

  if (players.length !== 2) return null;

  return (
    <div className="mt-6 flex items-center justify-center gap-6">
      {players.map((p, i) => (
        <div
          key={i}
          className="relative flex flex-col items-center rounded-xl bg-white/5 p-3"
        >
          {playername === p.name && (
            <>
              {/* Message bubble */}
              {lastmessage && showMessage && !messageConsumed && (
                <span
                  onClick={handleMessageClick}
                  className="
          absolute -top-5
          max-w-[140px]
          rounded-lg
          bg-gray-800
          px-2 py-2
          text-[10px]
          font-medium
          text-white
          shadow-lg
          truncate
          cursor-pointer
        "
                >
                  {lastmessage.text}
                </span>
              )}

              {/* Emoji bubble */}
            </>
          )}
          {emoji && showEmoji && emoji.player === p.name && (
            <span
              className="
          absolute -top-6
          text-3xl
          animate-bounce
          select-none
        "
            >
              {emoji.emoji}
            </span>
          )}

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

          <p className="mt-1 text-sm font-semibold text-white">{p.name}</p>
          <span className="text-xs text-zinc-400">{i === 0 ? "X" : "O"}</span>
        </div>
      ))}
    </div>
  );
}
