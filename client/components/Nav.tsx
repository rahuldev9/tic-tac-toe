"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Changename from "../app/components/Changename";

type User = {
  name: string;
  gender: string;
  image?: string;
};
type Props = {
  gameStarted: boolean;
  gameOver?: boolean;
};

export default function Nav({ gameStarted, gameOver }: Props) {
  const router = useRouter();
  const [auth, setAuth] = useState<User | null>(null);
  const [Gamestarted, setGamestarted] = useState(false);
  const [showChangeName, setShowChangeName] = useState(false);

  const maleAvatar = "/male.png";
  const femaleAvatar = "/female.png";

  // Function to load user data
  const loadUserData = () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (!user) {
        router.replace("/");
      } else {
        setAuth(JSON.parse(user));
      }
    }
  };

  useEffect(() => {
    if (gameStarted) {
      setGamestarted(true);
    }
  }, [gameStarted]);

  useEffect(() => {
    // Initial load
    loadUserData();

    // Listen for custom storage events
    const handleStorageChange = (e: CustomEvent) => {
      loadUserData();
    };

    // Listen for storage changes from other tabs
    const handleNativeStorageChange = (e: StorageEvent) => {
      if (e.key === "user") {
        loadUserData();
      }
    };

    window.addEventListener(
      "userDataUpdated",
      handleStorageChange as EventListener,
    );
    window.addEventListener("storage", handleNativeStorageChange);

    return () => {
      window.removeEventListener(
        "userDataUpdated",
        handleStorageChange as EventListener,
      );
      window.removeEventListener("storage", handleNativeStorageChange);
    };
  }, [router]);

  const leaveRoom = () => {
    router.push("/");
    window.location.reload();
  };

  const handleCloseChangeName = () => {
    setShowChangeName(false);
    // Reload user data after closing
    loadUserData();
  };

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-md border-b border-white/10">
        {auth ? (
          <>
            {/* Profile */}
            <div className="flex items-center gap-3">
              <img
                src={
                  auth.image
                    ? auth.image
                    : auth.gender === "male"
                      ? maleAvatar
                      : femaleAvatar
                }
                alt="Profile"
                className="h-12 w-12 rounded-full cursor-pointer border border-white/20 hover:scale-105 transition"
                onClick={() => setShowChangeName(true)}
              />

              <p className="text-sm font-semibold text-white">@{auth.name}</p>
            </div>

            {/* Leave Button */}
            {Gamestarted ? (
              <button
                onClick={leaveRoom}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
              >
                Leave
              </button>
            ) : (
              <button
                onClick={() => router.push("/")}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-white cursor-pointer transition"
              >
                Home
              </button>
            )}
          </>
        ) : (
          <div />
        )}
      </nav>

      {showChangeName && <Changename close={handleCloseChangeName} />}
    </>
  );
}
