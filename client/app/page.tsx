"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  UserCircle,
  Code,
  Share2,
  Trophy,
  Zap,
  Sparkles,
  Users,
  GamepadIcon,
} from "lucide-react";

type User = {
  name: string;
  gender: string;
};

const Home: React.FC = () => {
  const router = useRouter();

  const [user, setUser] = useState<User>({ name: "", gender: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleStart = () => router.push("/start");

  const handleNextStep = () => {
    if (!user.name.trim()) {
      setError("Please enter your name");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleGetStarted = () => {
    if (!user.gender) {
      setError("Please select your gender");
      return;
    }
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      {/* Neon Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_bottom,rgba(34,197,94,0.15),transparent_40%)]" />

      {isAuthenticated ? (
        <div className="relative z-10 flex flex-col items-center gap-10 text-center">
          <h1 className="text-[clamp(3rem,7vw,6rem)] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
            TIC <br /> TAC <br /> TOE
          </h1>

          <button
            onClick={handleStart}
            className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-14 py-4 text-lg font-bold text-black shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all hover:scale-110"
          >
            ▶ Play Game
          </button>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Setup Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md mx-auto lg:mx-0"
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                {step === 1 ? (
                  <>
                    <motion.h2
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 text-center text-2xl font-bold tracking-wide"
                    >
                      PLAYER SETUP
                    </motion.h2>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={user.name}
                        onChange={(e) =>
                          setUser({ ...user, name: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-center text-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </motion.div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 text-center text-sm text-red-400"
                      >
                        {error}
                      </motion.p>
                    )}

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={handleNextStep}
                      className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-bold tracking-wide text-black transition hover:scale-105"
                    >
                      NEXT →
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.h2
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 text-center text-2xl font-bold tracking-wide"
                    >
                      SELECT AVATAR
                    </motion.h2>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <select
                        value={user.gender}
                        onChange={(e) =>
                          setUser({ ...user, gender: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-center text-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Choose gender</option>
                        <option value="male">👦 Male</option>
                        <option value="female">👧 Female</option>
                      </select>
                    </motion.div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 text-center text-sm text-red-400"
                      >
                        {error}
                      </motion.p>
                    )}

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={handleGetStarted}
                      className="mt-8 w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 py-3 font-bold tracking-wide text-black transition hover:scale-105"
                    >
                      START GAME 🚀
                    </motion.button>
                  </>
                )}
              </div>

              {/* Info Text Below Form */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-center text-sm text-gray-400"
              >
                <p>Create your profile and challenge friends!</p>
                <p className="mt-2 text-xs">
                  Step {step} of 2 • Fast & Simple Setup
                </p>
              </motion.div>
            </motion.div>

            {/* Right Side - Animated Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative justify-center flex h-[400px] sm:h-[450px] lg:h-[500px] mt-8 lg:mt-0"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-purple-300/20 to-cyan-500/20 blur-3xl" />

              {/* Main Animation Container */}
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] h-full flex items-center justify-center">
                {/* Single Card with All Stages */}
                <div className="relative w-full h-[340px] sm:h-[380px] lg:h-[420px] bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border-2 border-gray-300 p-6 sm:p-8 overflow-hidden">
                  {/* Stage 1: Name Entry (0-2.5s) */}
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{
                      opacity: [1, 1, 0],
                      y: [0, 0, -50],
                    }}
                    transition={{
                      duration: 18,
                      times: [0, 0.12, 0.14],
                      repeat: Infinity,
                    }}
                    className="absolute inset-6 sm:inset-8 flex flex-col justify-center"
                  >
                    <div className="text-center mb-6">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg"
                      >
                        <UserCircle className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Enter Your Name
                      </h3>
                      <p className="text-sm text-gray-600">
                        Let's get started!
                      </p>
                    </div>

                    <div className="relative">
                      <div className="h-14 bg-white rounded-xl border-2 border-blue-400 px-4 flex items-center shadow-md">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="text-lg font-medium text-gray-900"
                        >
                          <motion.span
                            initial={{ width: 0 }}
                            animate={{ width: "auto" }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          >
                            Player One
                          </motion.span>
                        </motion.span>
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: 2 }}
                          className="ml-1 w-0.5 h-6 bg-blue-600"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Stage 2: Gender Selection (2.5-5s) */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      y: [50, 0, 0, -50],
                    }}
                    transition={{
                      duration: 18,
                      times: [0.14, 0.16, 0.26, 0.28],
                      repeat: Infinity,
                    }}
                    className="absolute inset-6 sm:inset-8 flex flex-col justify-center"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Choose Your Avatar
                      </h3>
                      <p className="text-sm text-gray-600">Pick your style</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        initial={{ scale: 1, borderColor: "rgb(147 197 253)" }}
                        animate={{
                          scale: [1, 1, 1.05, 1.05],
                          borderColor: [
                            "rgb(147 197 253)",
                            "rgb(147 197 253)",
                            "rgb(59 130 246)",
                            "rgb(59 130 246)",
                          ],
                        }}
                        transition={{
                          duration: 18,
                          times: [0, 0.2, 0.22, 0.26],
                          repeat: Infinity,
                        }}
                        className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl border-3 p-6 cursor-pointer shadow-lg"
                        style={{ borderWidth: "3px" }}
                      >
                        <div className="text-center">
                          <span className="text-5xl mb-3 block">👦</span>
                          <p className="text-sm font-semibold text-blue-700">
                            Male
                          </p>
                        </div>
                      </motion.div>

                      <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl border-2 border-pink-300 p-6 cursor-pointer opacity-60">
                        <div className="text-center">
                          <span className="text-5xl mb-3 block">👧</span>
                          <p className="text-sm font-semibold text-pink-700">
                            Female
                          </p>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 0, 1, 1],
                        scale: [0, 0, 1, 1],
                      }}
                      transition={{
                        duration: 18,
                        times: [0, 0.22, 0.23, 0.26],
                        repeat: Infinity,
                      }}
                      className="mt-4 text-center"
                    >
                      <div className="inline-flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 px-4 py-2 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Selected!
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Stage 3: Code Generation (5-7.5s) */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      y: [50, 0, 0, -50],
                    }}
                    transition={{
                      duration: 18,
                      times: [0.28, 0.3, 0.4, 0.42],
                      repeat: Infinity,
                    }}
                    className="absolute inset-6 sm:inset-8 flex flex-col justify-center"
                  >
                    <div className="text-center mb-6">
                      <motion.div
                        animate={{
                          rotate: [0, 0, 360, 360, 360],
                        }}
                        transition={{
                          duration: 18,
                          times: [0, 0.3, 0.33, 0.36, 1],
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg"
                      >
                        <Code className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Generating Code
                      </h3>
                      <p className="text-sm text-gray-600">
                        Creating your unique room...
                      </p>
                    </div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [0, 0, 1.1, 1, 1],
                      }}
                      transition={{
                        duration: 18,
                        times: [0, 0.33, 0.35, 0.36, 1],
                        repeat: Infinity,
                      }}
                      className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-3 border-green-300 shadow-lg"
                    >
                      <div className="text-center">
                        <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide font-medium">
                          Your Game Code
                        </p>
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl py-4 px-6 shadow-md">
                          <p className="font-mono font-bold text-white text-3xl tracking-wider">
                            ABC123
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <div className="flex justify-center gap-2 mt-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{
                            scale: [1, 1, 1.5, 1.5, 1],
                            opacity: [0.3, 0.3, 1, 1, 0.3],
                          }}
                          transition={{
                            duration: 18,
                            times: [
                              0,
                              0.3,
                              0.31 + i * 0.01,
                              0.33 + i * 0.01,
                              0.36,
                            ],
                            repeat: Infinity,
                          }}
                          className="w-2 h-2 rounded-full bg-green-500"
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Stage 4: Share Code (7.5-10s) */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      y: [50, 0, 0, -50],
                    }}
                    transition={{
                      duration: 18,
                      times: [0.42, 0.44, 0.54, 0.56],
                      repeat: Infinity,
                    }}
                    className="absolute inset-6 sm:inset-8 flex flex-col justify-center"
                  >
                    <div className="text-center mb-6">
                      <motion.div
                        animate={{
                          scale: [1, 1, 1.1, 1.1, 1],
                        }}
                        transition={{
                          duration: 18,
                          times: [0, 0.44, 0.46, 0.48, 1],
                          repeat: Infinity,
                        }}
                        className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg"
                      >
                        <Share2 className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Share with Friend
                      </h3>
                      <p className="text-sm text-gray-600">
                        Send code to start playing
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border-2 border-cyan-300 mb-4 shadow-sm">
                      <div className="text-center">
                        <p className="font-mono font-bold text-2xl text-cyan-700">
                          ABC123
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { icon: "📱", label: "SMS" },
                        { icon: "✉️", label: "Email" },
                        { icon: "📋", label: "Copy" },
                      ].map((option, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{
                            scale: [0, 0, 1, 1],
                            opacity: [0, 0, 1, 1],
                          }}
                          transition={{
                            duration: 18,
                            times: [0, 0.46 + i * 0.01, 0.47 + i * 0.01, 1],
                            repeat: Infinity,
                          }}
                          className="bg-white rounded-lg p-4 border-2 border-gray-200 shadow-sm hover:border-cyan-400 transition-colors cursor-pointer"
                        >
                          <div className="text-center">
                            <span className="text-2xl block mb-1">
                              {option.icon}
                            </span>
                            <p className="text-xs font-medium text-gray-700">
                              {option.label}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Stage 5: Players Joining (10-12.5s) */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      y: [50, 0, 0, -50],
                    }}
                    transition={{
                      duration: 18,
                      times: [0.56, 0.58, 0.68, 0.7],
                      repeat: Infinity,
                    }}
                    className="absolute inset-6 sm:inset-8 flex flex-col justify-center"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Players Joining
                      </h3>
                      <motion.p
                        animate={{
                          opacity: [1, 1, 0, 0],
                        }}
                        transition={{
                          duration: 18,
                          times: [0.58, 0.62, 0.63, 1],
                          repeat: Infinity,
                        }}
                        className="text-sm text-gray-600"
                      >
                        Waiting for opponent...
                      </motion.p>
                    </div>

                    <div className="space-y-4">
                      {/* Player 1 */}
                      <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{
                          x: [-100, -100, 0, 0],
                          opacity: [0, 0, 1, 1],
                        }}
                        transition={{
                          duration: 18,
                          times: [0, 0.59, 0.6, 1],
                          repeat: Infinity,
                        }}
                        className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-4 border-2 border-blue-300 flex items-center gap-3 shadow-md"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl shadow-md">
                          👦
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            Player One
                          </p>
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Ready
                          </div>
                        </div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{
                            scale: [0, 0, 1.2, 1, 1],
                          }}
                          transition={{
                            duration: 18,
                            times: [0, 0.6, 0.61, 0.62, 1],
                            repeat: Infinity,
                          }}
                          className="text-2xl"
                        >
                          ✓
                        </motion.div>
                      </motion.div>

                      {/* Player 2 */}
                      <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{
                          x: [100, 100, 0, 0],
                          opacity: [0, 0, 1, 1],
                        }}
                        transition={{
                          duration: 18,
                          times: [0, 0.62, 0.63, 1],
                          repeat: Infinity,
                        }}
                        className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl p-4 border-2 border-pink-300 flex items-center gap-3 shadow-md"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-2xl shadow-md">
                          👧
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            Player Two
                          </p>
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Ready
                          </div>
                        </div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{
                            scale: [0, 0, 1.2, 1, 1],
                          }}
                          transition={{
                            duration: 18,
                            times: [0, 0.63, 0.64, 0.65, 1],
                            repeat: Infinity,
                          }}
                          className="text-2xl"
                        >
                          ✓
                        </motion.div>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 0, 1.05, 1, 1],
                        opacity: [0, 0, 1, 1, 1],
                      }}
                      transition={{
                        duration: 18,
                        times: [0, 0.65, 0.66, 0.67, 1],
                        repeat: Infinity,
                      }}
                      className="mt-6"
                    >
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl py-3 px-6 text-center shadow-lg">
                        <p className="text-white font-bold">Starting Game...</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Stage 6: Game Playing & Winner (12.5-18s) */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      opacity: [0, 1, 1],
                      y: [50, 0, 0],
                    }}
                    transition={{
                      duration: 18,
                      times: [0.7, 0.72, 1],
                      repeat: Infinity,
                    }}
                    className="absolute inset-6 flex flex-col h-full"
                  >
                    {/* Game Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
                          <GamepadIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">
                            Live Match
                          </h4>
                          <p className="text-xs text-gray-500">In Progress</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-full border border-green-200">
                        <Users className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">
                          2/2
                        </span>
                      </div>
                    </div>

                    {/* Tic-Tac-Toe Board */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-[200px]">
                        {/* Position 0,0 - X (Move 1) */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{
                            scale: [0, 0, 1.2, 1, 1],
                            rotate: [-180, -180, 0, 0, 0],
                          }}
                          transition={{
                            duration: 18,
                            times: [0, 0.74, 0.75, 0.76, 1],
                            repeat: Infinity,
                          }}
                          className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center border-2 border-blue-400 shadow-md"
                        >
                          <span className="text-3xl font-bold text-blue-600">
                            X
                          </span>
                        </motion.div>

                        {/* Position 0,1 - O (Move 2) */}
                        <motion.div
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{
                            scale: [0, 0, 1.2, 1, 1],
                            rotate: [180, 180, 0, 0, 0],
                          }}
                          transition={{
                            duration: 18,
                            times: [0, 0.77, 0.78, 0.79, 1],
                            repeat: Infinity,
                          }}
                          className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center border-2 border-pink-400 shadow-md"
                        >
                          <span className="text-3xl font-bold text-pink-600">
                            O
                          </span>
                        </motion.div>

                        {/* Position 0,2 - Empty */}
                        <div className="aspect-square bg-gray-100 rounded-lg border-2 border-gray-300" />

                        {/* Position 1,0 - O (Move 4) */}
                        <motion.div
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{
                            scale: [0, 0, 1.2, 1, 1],
                            rotate: [180, 180, 0, 0, 0],
                          }}
                          transition={{
                            duration: 18,
                            times: [0, 0.83, 0.84, 0.85, 1],
                            repeat: Infinity,
                          }}
                          className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center border-2 border-pink-400 shadow-md"
                        >
                          <span className="text-3xl font-bold text-pink-600">
                            O
                          </span>
                        </motion.div>

                        {/* Position 1,1 - X (Move 3) */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{
                            scale: [0, 0, 1.2, 1, 1],
                            rotate: [-180, -180, 0, 0, 0],
                          }}
                          transition={{
                            duration: 18,
                            times: [0, 0.8, 0.81, 0.82, 1],
                            repeat: Infinity,
                          }}
                          className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center border-2 border-blue-400 shadow-md"
                        >
                          <span className="text-3xl font-bold text-blue-600">
                            X
                          </span>
                        </motion.div>

                        {/* Position 1,2 - Empty */}
                        <div className="aspect-square bg-gray-100 rounded-lg border-2 border-gray-300" />

                        {/* Position 2,0 - Empty */}
                        <div className="aspect-square bg-gray-100 rounded-lg border-2 border-gray-300" />

                        {/* Position 2,1 - Empty */}
                        <div className="aspect-square bg-gray-100 rounded-lg border-2 border-gray-300" />

                        {/* Position 2,2 - X (Move 5 - Winning Move) */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{
                            scale: [0, 0, 1.3, 1.1, 1.1],
                            rotate: [-180, -180, 0, 0, 0],
                          }}
                          transition={{
                            duration: 18,
                            times: [0, 0.86, 0.87, 0.88, 1],
                            repeat: Infinity,
                          }}
                          className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center border-2 border-blue-400 shadow-md relative overflow-hidden"
                        >
                          <motion.div
                            animate={{
                              opacity: [0, 0, 0.3, 0],
                            }}
                            transition={{
                              duration: 18,
                              times: [0, 0.87, 0.88, 0.9],
                              repeat: Infinity,
                            }}
                            className="absolute inset-0 bg-yellow-300"
                          />
                          <span className="text-3xl font-bold text-blue-600 relative z-10">
                            X
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Winning Line Animation */}
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{
                        scaleX: [0, 0, 1, 1],
                        opacity: [0, 0, 1, 1],
                      }}
                      transition={{
                        duration: 18,
                        times: [0, 0.88, 0.9, 1],
                        repeat: Infinity,
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent origin-center"
                      style={{
                        transform: "translate(-50%, -50%) rotate(45deg)",
                      }}
                    />

                    {/* Winner Banner */}
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.8 }}
                      animate={{
                        opacity: [0, 0, 1, 1],
                        y: [30, 30, 0, 0],
                        scale: [0.8, 0.8, 1.05, 1],
                      }}
                      transition={{
                        duration: 18,
                        times: [0, 0.9, 0.91, 0.92],
                        repeat: Infinity,
                      }}
                      className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-xl p-4 shadow-2xl border-2 border-white mt-4"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <Trophy className="w-6 h-6 text-white" />
                        <span className="text-white font-bold text-lg">
                          Player X Wins! 🎉
                        </span>
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Floating Progress Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2"
              >
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-gray-400"
                    animate={{
                      backgroundColor: [
                        "rgb(156 163 175)",
                        "rgb(156 163 175)",
                        "rgb(59 130 246)",
                        "rgb(156 163 175)",
                      ],
                    }}
                    transition={{
                      duration: 18,
                      times: [0, i * 0.167 - 0.01, i * 0.167, i * 0.167 + 0.15],
                      repeat: Infinity,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
