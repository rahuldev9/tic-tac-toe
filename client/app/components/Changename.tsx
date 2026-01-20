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
  const [name, setName] = useState("");
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
    reader.onloadend = () => setImage(reader.result as string);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        {/* Close */}
        <button
          onClick={close}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          ✕
        </button>

        {auth ? (
          <div className="flex flex-col items-center gap-6">
            {/* Profile */}
            <div className="flex flex-col items-center gap-2">
              <img
                src={
                  auth.image
                    ? auth.image
                    : auth.gender === "male"
                      ? maleAvatar
                      : femaleAvatar
                }
                alt="Profile"
                className="h-20 w-20 rounded-full border object-cover shadow-sm"
              />
              <p className="text-base font-semibold text-gray-800">
                @{auth.name}
              </p>
            </div>

            {/* Action Buttons */}
            {!showNameInput && !showProfileInput && (
              <div className="flex w-full gap-3">
                <button
                  onClick={() => setShowNameInput(true)}
                  className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  Change Name
                </button>
                <button
                  onClick={() => setShowProfileInput(true)}
                  className="flex-1 rounded-lg bg-gray-800 py-2 text-sm font-medium text-white transition hover:bg-gray-900"
                >
                  Change Photo
                </button>
              </div>
            )}

            {/* Change Name */}
            {showNameInput && (
              <div className="w-full space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter new name"
                  className="w-full rounded-lg text-black border px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <button
                  onClick={handleSave}
                  className="w-full rounded-lg bg-green-600 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            )}

            {/* Change Profile Image */}
            {showProfileInput && (
              <form
                onSubmit={handleUpload}
                className="flex w-full flex-col items-center gap-4"
              >
                <label className="w-full cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 hover:border-purple-500">
                  Click to upload image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="h-20 w-20 rounded-full object-cover shadow-md transition"
                  />
                )}

                <button
                  type="submit"
                  className="w-full rounded-lg bg-purple-600 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
                >
                  Upload Photo
                </button>
              </form>
            )}
          </div>
        ) : (
          <p className="text-center text-sm text-gray-600">
            Please log in to update your profile.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChangeName;
