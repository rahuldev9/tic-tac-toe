"use client";

import React, { useEffect, useState } from "react";

type User = {
  name: string;
  gender?: "male" | "female";
  image?: string;
};

type Props = {
  close: () => void;
};

const ChangeName: React.FC<Props> = ({ close }) => {
  const [name, setName] = useState<string>("");
  const [auth, setAuth] = useState<User | null>(null);
  const [showNameInput, setShowNameInput] = useState(false);
  const [showProfileInput, setShowProfileInput] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const maleAvatar = "/male.png";
  const femaleAvatar = "/female.png";

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser: User = JSON.parse(user);
      setAuth(parsedUser);
      setName(parsedUser.name);
    }
  }, []);

  const handleSave = () => {
    if (!auth) return;

    const updatedUser = { ...auth, name };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setAuth(updatedUser);
    close();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !image) return;

    const updatedUser = { ...auth, image };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setAuth(updatedUser);
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[320px] rounded-lg bg-white p-5 shadow-lg">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {auth ? (
          <div className="flex flex-col items-center gap-4">
            {/* Profile */}
            <div className="flex flex-col items-center">
              <img
                src={
                  auth.image
                    ? auth.image
                    : auth.gender === "male"
                    ? maleAvatar
                    : femaleAvatar
                }
                alt="Profile"
                className="h-12 w-12 rounded-full object-cover"
              />
              <p className="mt-1 text-sm font-medium">@{auth.name}</p>
            </div>

            {/* Actions */}
            {!showNameInput && !showProfileInput && (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNameInput(true)}
                  className="rounded-md bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700"
                >
                  Change Name
                </button>
                <button
                  onClick={() => setShowProfileInput(true)}
                  className="rounded-md bg-gray-700 px-4 py-1.5 text-sm text-white hover:bg-gray-800"
                >
                  Change Profile
                </button>
              </div>
            )}

            {/* Change Name */}
            {showNameInput && (
              <div className="flex w-full flex-col gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter new name"
                  className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSave}
                  className="rounded-md bg-green-600 py-2 text-sm text-white hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            )}

            {/* Change Profile Image */}
            {showProfileInput && (
              <form
                onSubmit={handleUpload}
                className="flex w-full flex-col items-center gap-3"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-sm"
                />

                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                )}

                <button
                  type="submit"
                  className="rounded-md bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
                >
                  Upload
                </button>
              </form>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            Please log in to change your name.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChangeName;
