"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
        <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6">
          {/* Centered Setup Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
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
                    className="flex gap-4"
                  >
                    {/* Male */}
                    <div
                      onClick={() => setUser({ ...user, gender: "male" })}
                      className={`w-full cursor-pointer rounded-xl border px-4 py-3 text-center text-lg transition
      ${
        user.gender === "male"
          ? "border-green-500 bg-green-500/20 text-white"
          : "border-white/10 bg-black/60 text-white/70 hover:bg-white/10"
      }`}
                    >
                      👦 Male
                    </div>

                    {/* Female */}
                    <div
                      onClick={() => setUser({ ...user, gender: "female" })}
                      className={`w-full cursor-pointer rounded-xl border px-4 py-3 text-center text-lg transition
      ${
        user.gender === "female"
          ? "border-green-500 bg-green-500/20 text-white"
          : "border-white/10 bg-black/60 text-white/70 hover:bg-white/10"
      }`}
                    >
                      👧 Female
                    </div>
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
        </div>
      )}
    </main>
  );
};

export default Home;
