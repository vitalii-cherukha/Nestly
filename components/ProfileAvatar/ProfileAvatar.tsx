"use client";

import css from "./ProfileAvatar.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
import { updateAvatar } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import iziToast from "izitoast";
import { ApiError } from "next/dist/server/api-utils";

const ProfileAvatar = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
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
      if (!file.type.startsWith("image/")) {
        setError("Only Images");
        return;
      } else if (file.size > 1 * 1024 * 1024) {
        setError("Max file size 1MB");
        return;
      }
      try {
        setIsUploading(true);

        const reader = new FileReader();
        reader.onloadend = () => {
          setUser({
            ...user,
            avatarUrl: reader.result as string,
          });
        };
        reader.readAsDataURL(file);

        const updatedUser = await updateAvatar(file);
        setUser({
          ...user,
          ...updatedUser,
        });
      } catch (error) {
        setError((error as ApiError).message);
        console.log(error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className={css.container}>
      <Image
        src={user.avatarUrl}
        alt={user.name || "User avatar"}
        width={132}
        height={132}
        className={css.avatarUser}
        priority
      />
      <div className={css.wrapper}>
        <h2 className={css.nameUser}>{user.name}</h2>
        <p className={css.emailUser}>{user.email}</p>
        <button onClick={handleClick} type="button" className={css.btn}>
          {isUploading ? "Завантажується..." : "Завантажити нове фото"}
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          disabled={isUploading}
        />

        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default ProfileAvatar;
