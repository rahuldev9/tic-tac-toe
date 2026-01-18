type Message = {
  player: string;
  text: string;
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
  if (!open) return null;

  return (
    <div className="fixed bottom-20 right-6 z-50 w-80 rounded-xl bg-zinc-900 p-4 shadow-xl">
      {/* Header */}
      <div className="mb-2 flex justify-between">
        <h4 className="font-bold">Chat</h4>
        <button onClick={() => setOpen(false)}>✖</button>
      </div>

      {/* Messages */}
      <div className="mb-2 h-48 overflow-y-auto rounded bg-zinc-800 p-2 text-sm">
        {messages.map((m, i) => {
          const me = m.player === playerName;
          return (
            <div
              key={i}
              className={`mb-1 rounded p-1 ${
                me ? "ml-auto bg-blue-500" : "mr-auto bg-zinc-700"
              }`}
            >
              <b className="text-xs">{m.player}</b>
              <p>{m.text}</p>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="flex-1 rounded bg-zinc-800 p-1 text-sm"
          placeholder="Type..."
        />
        <button
          onClick={sendMessage}
          className="rounded bg-green-500 px-3 text-black"
        >
          Send
        </button>
      </div>
    </div>
  );
}
