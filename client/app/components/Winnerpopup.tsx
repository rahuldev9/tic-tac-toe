"use client";

import React, { useEffect, useState } from "react";

type WinnerPopupProps = {
  onClose: () => void;
  gamestatus: string;
  winstate: string;
  player: string | null;
};

export default function Winnerpopup({
  onClose,
  gamestatus,
  winstate,
  player,
}: WinnerPopupProps) {
  const [winmsg, setWinmsg] = useState("");

  /* ---------- WIN MESSAGE LOGIC ---------- */
  useEffect(() => {
    if (gamestatus === "Opponent left the game.") {
      setWinmsg("");
    } else if (winstate === "Draw") {
      setWinmsg("IT'S A DRAW");
    } else if (winstate === player) {
      setWinmsg("YOU WIN 🎉");
    } else {
      setWinmsg("YOU LOSE 😔");
    }
  }, [gamestatus, winstate, player]);

  /* ---------- AUTO CLOSE ---------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[300px] rounded-xl bg-white p-6 text-center shadow-xl animate-fade-in">
        <h2 className="text-xl font-bold text-gray-800">{gamestatus}</h2>

        {winmsg && (
          <p className="mt-3 text-2xl font-extrabold text-black">{winmsg}</p>
        )}
      </div>
    </div>
  );
}
