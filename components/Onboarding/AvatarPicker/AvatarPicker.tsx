"use client";
import { useState } from "react";
import css from "./AvatarPicker.module.css";
import Image from "next/image";
import { useOnboardingStore } from "@/lib/store/onboardingStore";

export default function AvatarPicker() {
  const [error, setError] = useState("");
  const avatar = useOnboardingStore((state) => state.avatar);
  const setAvatar = useOnboardingStore((state) => state.setAvatar);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Only Images");
        return;
      } else if (file.size > 5 * 1024 * 1024) {
        setError("Max file size 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={css.avatarWrapper}>
      <Image
        className={css.avatar}
        src={avatar}
        alt="Preview"
        width={300}
        height={300}
      />
      <label className={css.button}>
        Завантажити фото
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={css.input}
        />
      </label>
      {error && <div className={css.error}>{error}</div>}
    </div>
  );
}
