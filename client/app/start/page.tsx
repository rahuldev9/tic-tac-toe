"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";

import Nav from "@/components/Nav";
import Popup from "@/components/Popup";
import Winnerpopup from "@/components/Winnerpopup";

import GameHeader from "../components/GameHeader";
import PlayersPanel from "../components/PlayersPanel";
import TurnIndicator from "../components/TurnIndicator";
import GameActions from "../components/GameActions";
import GameBoard from "../components/GameBoard";
import ChatWidget from "../components/ChatWidget";

const BACKENDURL = process.env.NEXT_PUBLIC_BACKENDURL;

const socket = io(`${BACKENDURL}`);

export default function StartPage() {
  const router = useRouter();

  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [roomId, setRoomId] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameboard, setGameboard] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [winnerpopup, setWinnerPopup] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState<"X" | "O" | null>(null);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [players, setPlayers] = useState<any[]>([]);

  const [roomToJoin, setRoomToJoin] = useState("");
  const [gameStatus, setGameStatus] = useState("");
  const [winmsg, setWinmsg] = useState("");

  // Chat
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState("");

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const playerName = user?.name || "Guest";
  const gender = user?.gender;
  const profile = user?.image;

  /* ---------------- SOCKET ---------------- */

  useEffect(() => {
    socket.on("roomCreated", (id: string) => {
      setRoomId(id);
      setGameStatus("Waiting for a friend...");
      const existingUser = localStorage.getItem("user");
      const user = existingUser ? JSON.parse(existingUser) : {};

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          gameId: id,
        }),
      );
    });

    socket.on("startGame", ({ creatorId, players }) => {
      setGameStarted(true);
      setGameboard(true);
      setPlayers(players);
      setBoard(Array(9).fill(null));

      const isCreator = socket.id === creatorId;
      setPlayerSymbol(isCreator ? "X" : "O");
      setIsMyTurn(isCreator);
    });

    socket.on("moveMade", ({ board, currentPlayer }) => {
      setBoard(board);
      setIsMyTurn(currentPlayer === socket.id);
    });

    socket.on("gameOver", ({ winner }) => {
      setGameOver(true);
      setWinmsg(winner);
      setWinnerPopup(true);
    });

    socket.on("opponentLeft", () => {
      setGameStatus("Opponent left the game.");
      setWinnerPopup(true);
    });

    socket.on("receiveMessage", (msg) => setMessages((prev) => [...prev, msg]));

    return () => {
      socket.removeAllListeners(); // ✅ now returns void
    };
  }, []);
  /* ---------------- ACTIONS ---------------- */

  const createRoom = () => {
    socket.emit("createRoom", playerName, gender, profile);
    setShowPopup(true);
  };

  const joinRoom = () => {
    socket.emit("joinRoom", {
      roomId: roomToJoin,
      playerName,
      gender,
      profile,
    });
    setRoomId(roomToJoin);
  };

  const makeMove = (index: number) => {
    if (board[index] === null && isMyTurn) {
      socket.emit("makeMove", { roomId, index });
    }
  };

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    socket.emit("sendMessage", {
      roomId,
      player: playerName,
      text: messageInput,
    });
    setMessageInput("");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      {gameStarted && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 rounded-full bg-green-500 p-4 text-black"
        >
          💬
        </button>
      )}

      <div className="mx-auto max-w-md px-4 py-6">
        <GameHeader gameStarted={gameStarted} gameOver={gameOver} />

        <PlayersPanel players={players} />
        <TurnIndicator playerSymbol={playerSymbol} isMyTurn={isMyTurn} />

        <GameActions
          gameStarted={gameStarted}
          roomCode={roomId}
          roomToJoin={roomToJoin}
          setRoomToJoin={setRoomToJoin}
          createRoom={createRoom}
          joinRoom={joinRoom}
        />

        {roomId && gameboard && <GameBoard board={board} makeMove={makeMove} />}
      </div>

      <ChatWidget
        open={chatOpen}
        setOpen={setChatOpen}
        messages={messages}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        sendMessage={sendMessage}
        playerName={playerName}
      />

      {showPopup && (
        <Popup roomId={roomId} onClose={() => setShowPopup(false)} />
      )}

      {winnerpopup && (
        <Winnerpopup
          gamestatus={gameStatus}
          winstate={winmsg}
          player={playerSymbol}
          onClose={() => {
            setWinnerPopup(false);
            if (gameStatus === "Opponent left the game.") router.push("/");
          }}
        />
      )}
    </main>
  );
}
