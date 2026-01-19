"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Changename from "../app/components/Changename";

type User = {
  name: string;
  gender: string;
  image?: string;
};

export default function Nav() {
  const router = useRouter();

  const [auth, setAuth] = useState<User | null>(null);

  const [showChangeName, setShowChangeName] = useState(false);

  const maleAvatar = "/male.png";
  const femaleAvatar = "/female.png";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (!user) {
        router.replace("/");
      }
      if (user) setAuth(JSON.parse(user));
    }
  }, []);

  const leaveRoom = () => {
    router.push("/");
    window.location.reload();
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
            <button
              onClick={leaveRoom}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
            >
              Leave
            </button>
          </>
        ) : (
          <div />
        )}
      </nav>

      {showChangeName && <Changename close={() => setShowChangeName(false)} />}
    </>
  );
}
