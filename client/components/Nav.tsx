"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
      <Link href="/" className="text-lg font-bold">
        TicTacToe
      </Link>

      <div className="flex gap-4 text-sm text-zinc-400">
        <Link href="/">Home</Link>
        <Link href="/start">Play</Link>
      </div>
    </nav>
  );
}
