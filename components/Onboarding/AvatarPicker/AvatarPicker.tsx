"use client";
import { useState } from "react";
import css from "./AvatarPicker.module.css";
import Image from "next/image";
import { updateAvatar } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AvatarPicker() {
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");

    if (file && user) {
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
          setUser({ ...user, avatarUrl: reader.result as string });
        };
        reader.readAsDataURL(file);

        const updatedUser = await updateAvatar(file);
        setUser(updatedUser);
      } catch (error) {
        console.error(error);
        setError("Помилка завантаження фото");
        if (user) {
          setUser(user);
        }
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className={css.avatarWrapper}>
      <Image
        className={css.avatar}
        src={user?.avatarUrl || "/default-avatar.png"}
        alt="Preview"
        width={164}
        height={164}
      />
      <label className={css.button}>
        {isUploading ? "Завантажується..." : "Завантажити фото"}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={css.input}
          disabled={isUploading}
        />
      </label>
      {error && <div className={css.error}>{error}</div>}
    </div>
  );
}
