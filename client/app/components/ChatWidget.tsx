import { useEffect, useRef } from "react";
import { Send } from "lucide-react";

type Message = {
  player: string;
  text: string;
  time?: string;
};

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  messages: Message[];
  messageInput: string;
  setMessageInput: (v: string) => void;
  sendMessage: () => void;
  playerName: string;
};

export default function ChatWidget({
  open,
  setOpen,
  messages,
  messageInput,
  setMessageInput,
  sendMessage,
  playerName,
}: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView();
    }
  }, [messages, open]);

  if (!open) return null;

  return (
    <div className="fixed bottom-5 right-6 z-50 w-80 rounded-2xl border border-white/10 bg-zinc-900/80 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-zinc-800 to-zinc-900 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
          <h4 className="text-sm font-bold tracking-wider text-white">
            GAME CHAT
          </h4>
        </div>

        <button
          onClick={() => setOpen(false)}
          className="text-zinc-400 transition hover:text-white"
        >
          ✖
        </button>
      </div>

      {/* Messages */}
      <div className="h-52 space-y-2 overflow-y-auto bg-zinc-950/70 p-3 text-sm scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {messages.map((m, i) => {
          const me = m.player === playerName;

          return (
            <div
              key={i}
              className={`flex ${me ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-[75%] rounded-xl px-3 py-2 ${
                  me
                    ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                    : "bg-zinc-800 text-zinc-100"
                }`}
              >
                {!me && (
                  <p className="mb-1 text-xs font-semibold text-zinc-400">
                    {m.player}
                  </p>
                )}

                <p className="break-words">{m.text}</p>

                {m.time && (
                  <p className="mt-1 text-right text-[10px] text-zinc-300 opacity-70">
                    {m.time}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 rounded-b-2xl border-t border-white/10 bg-zinc-900/80 p-2">
        <input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && messageInput.trim()) sendMessage();
          }}
          placeholder="Type a message..."
          className="flex-1 rounded-lg bg-zinc-800/90 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-gray-700"
        />

        <button
          onClick={sendMessage}
          disabled={!messageInput.trim()}
          className="rounded-lg  px-3 py-2 text-sm font-bold text-white transition active:scale-95 disabled:opacity-40"
        >
          <Send className="h-5 w-5 transform transition-transform duration-300 hover:rotate-45" />
        </button>
      </div>
    </div>
  );
}
