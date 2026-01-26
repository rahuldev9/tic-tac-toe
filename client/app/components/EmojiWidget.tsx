import { CircleEllipsis } from "lucide-react";
import { useState } from "react";
import emojiData from "emoji-datasource";

const ALL_EMOJIS = emojiData.map((e) => ({
  emoji: e.unified
    .split("-")
    .map((u) => String.fromCodePoint(parseInt(u, 16)))
    .join(""),
  name: e.short_name.replace(/_/g, " "),
}));

type Props = {
  sendEmoji: (emoji: string) => void;
};

const QUICK_EMOJIS = ["🔥", "😂", "😎", "❤️", "👍"];

export default function EmojiWidget({ sendEmoji }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSend = (emoji: string) => {
    sendEmoji(emoji);
    setOpen(false);
    setSearch("");
  };

  const filteredEmojis = ALL_EMOJIS.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        />
      )}

      {/* Emoji Popup */}
      {open && (
        <div
          className="
            fixed z-50
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[92vw] max-w-md sm:max-w-lg
            p-4 sm:p-6
            rounded-3xl
            bg-white/20 backdrop-blur-xl
            shadow-2xl
            animate-scale-in
          "
        >
          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search emoji…"
            className="
              w-full mb-4
              px-4 py-2
              rounded-xl
              bg-white/40
              placeholder:text-black/50
              outline-none
              focus:ring-2 focus:ring-white/60
            "
          />

          {/* Emoji Grid */}
          <div
            className="
              grid
              grid-cols-5 sm:grid-cols-6 md:grid-cols-8
              gap-3
              max-h-[50vh]
              overflow-y-auto
              px-1
              scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            "
          >
            {filteredEmojis.length ? (
              filteredEmojis.map(({ emoji, name }) => (
                <button
                  key={emoji}
                  title={name}
                  onClick={() => handleSend(emoji)}
                  className="
                    text-3xl
                    hover:scale-125
                    active:scale-95
                    transition
                  "
                >
                  {emoji}
                </button>
              ))
            ) : (
              <div className="col-span-full text-center text-black/60">
                No emojis found 😕
              </div>
            )}
          </div>
        </div>
      )}

      {/* Emoji Bar */}
      <div
        className="
          fixed z-50
          bottom-20
          left-1/2 -translate-x-1/2
          sm:left-auto sm:right-4 sm:translate-x-0
          flex flex-row-reverse sm:flex-col
          gap-1
          p-2
          rounded-2xl
          backdrop-blur-lg
          shadow-lg
        "
      >
        {/* More Button */}
        <button
          onClick={() => setOpen(!open)}
          className="
              text-2xl sm:text-3xl flex flex-row justify-center
              rounded-lg
              px-3 py-2 sm:px-2 sm:py-1
              hover:scale-125
              active:scale-95
              transition
            "
        >
          <CircleEllipsis className="w-8 h-8 text-gray-400" />
        </button>

        {QUICK_EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleSend(emoji)}
            className="
              text-2xl sm:text-3xl
              rounded-lg
              px-3 py-2 sm:px-2 sm:py-1
              hover:scale-125
              active:scale-95
              transition
            "
          >
            {emoji}
          </button>
        ))}
      </div>
    </>
  );
}
