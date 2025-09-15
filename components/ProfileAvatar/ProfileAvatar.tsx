"use client";

import css from "./ProfileAvatar.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
import { ApiError } from "next/dist/server/api-utils";
import { updateAvatar } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const ProfileAvatar = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!user) {
    return <p>Завантаження профілю...</p>;
  }

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const updatedUser = await updateAvatar(file);
        setUser({
          ...user,
          ...updatedUser,
        });
      } catch (error) {
        setError((error as ApiError).message);
      }
    }
  };

  return (
    <div className={css.container}>
      <Image
        src={user.avatarUrl}
        alt={user.name}
        width={132}
        height={132}
        className={css.avatarUser}
      />
      <div className={css.wrapper}>
        <h2 className={css.nameUser}>{user.name}</h2>
        <p className={css.emailUser}>{user.email}</p>
        <button onClick={handleClick} type="button" className={css.btn}>
          Завантажити нове фото
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default ProfileAvatar;
