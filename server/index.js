const express = require("express");

const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
const BACKENDURL = process.env.BACKENDURL;
const FRONTENDURL = process.env.NEXT_PUBLIC_FRONTEND_URL;

const io = new Server(server, {
  cors: {
    origin: "*", // Next.js dev
    methods: ["GET", "POST"],
  },
});

const rooms = {}; // roomId -> room data

io.on("connection", (socket) => {
  // console.log("User connected:", socket.id);

  /* ---------------- CREATE ROOM ---------------- */
  socket.on("createRoom", (playerName, gender, profile) => {
    const roomId = Math.random().toString(36).substring(2, 8);

    rooms[roomId] = {
      creator: socket.id,
      players: [
        {
          id: socket.id,
          name: playerName,
          gender,
          profile,
        },
      ],
      board: Array(9).fill(null),
      currentPlayer: socket.id,
      chat: [],
    };

    socket.join(roomId);
    socket.emit("roomCreated", roomId);

    // console.log(`Room ${roomId} created by ${playerName}`);
  });

  /* ---------------- JOIN ROOM ---------------- */
  socket.on("joinRoom", ({ roomId, playerName, gender, profile }) => {
    const room = rooms[roomId];

    if (!room) {
      socket.emit("error", "Room does not exist");
      return;
    }

    if (room.players.length >= 2) {
      socket.emit("error", "Room is full");
      return;
    }

    room.players.push({
      id: socket.id,
      name: playerName,
      gender,
      profile,
    });

    socket.join(roomId);

    io.to(roomId).emit("startGame", {
      creatorId: room.creator,
      players: room.players,
    });

    // console.log(`${playerName} joined room ${roomId}`);
  });

  /* ---------------- MAKE MOVE ---------------- */
  socket.on("makeMove", ({ roomId, index }) => {
    const room = rooms[roomId];
    if (!room) return;

    if (room.board[index] !== null || socket.id !== room.currentPlayer) {
      return;
    }

    const symbol = room.players[0].id === socket.id ? "X" : "O";

    room.board[index] = symbol;

    const nextPlayer = room.players.find((p) => p.id !== socket.id);

    if (!nextPlayer) return;

    room.currentPlayer = nextPlayer.id;

    io.to(roomId).emit("moveMade", {
      board: room.board,
      currentPlayer: room.currentPlayer,
    });

    checkWinner(roomId);
  });

  /* ---------------- RESET GAME ---------------- */
  socket.on("resetGame", (roomId) => {
    const room = rooms[roomId];
    if (!room || room.players.length !== 2) return;

    room.board = Array(9).fill(null);
    room.currentPlayer = room.players[0].id;

    io.to(roomId).emit("gameReset", {
      board: room.board,
      currentPlayer: room.currentPlayer,
    });
  });

  /* ---------------- CHAT ---------------- */
  socket.on("sendMessage", ({ roomId, text, player }) => {
    const room = rooms[roomId];
    if (!room) return;

    const chatMessage = { player, text };
    room.chat.push(chatMessage);

    io.to(roomId).emit("receiveMessage", chatMessage);
  });
  socket.on("sendEmoji", ({ roomId, emoji, player }) => {
    const room = rooms[roomId];
    if (!room) return;

    const reaction = { player, emoji };

    io.to(roomId).emit("receiveEmoji", reaction);
  });

  socket.on("ready", (roomId) => {
    socket.to(roomId).emit("ready");
  });

  socket.on("video-frame", ({ roomId, frame }) => {
    // 🔥 volatile = no buffering, no lag buildup
    socket.to(roomId).volatile.emit("video-frame", frame);
  });
  socket.on("offer", ({ roomId, offer }) => {
    socket.to(roomId).emit("offer", { offer });
  });

  socket.on("answer", ({ roomId, answer }) => {
    socket.to(roomId).emit("answer", { answer });
  });

  socket.on("ice-candidate", ({ roomId, candidate }) => {
    socket.to(roomId).emit("ice-candidate", { candidate });
  });

  /* ---------------- DISCONNECT ---------------- */
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    for (const roomId in rooms) {
      const room = rooms[roomId];

      if (room.players.some((p) => p.id === socket.id)) {
        io.to(roomId).emit("opponentLeft");
        delete rooms[roomId];
        console.log(`Room ${roomId} deleted`);
        break;
      }
    }
  });
});

/* ---------------- WIN CHECK ---------------- */
function checkWinner(roomId) {
  const room = rooms[roomId];
  if (!room) return;

  const b = room.board;

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b1, c] of lines) {
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
      io.to(roomId).emit("gameOver", { winner: b[a] });
      return;
    }
  }

  if (!b.includes(null)) {
    io.to(roomId).emit("gameOver", { winner: "Draw" });
  }
}

/* ---------------- START SERVER ---------------- */
server.listen(PORT, () => {
  console.log(`Socket.IO server running on ${BACKENDURL}`);
});
