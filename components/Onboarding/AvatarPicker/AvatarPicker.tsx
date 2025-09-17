"use client";
import { useState } from "react";
import css from "./AvatarPicker.module.css";
import Image from "next/image";
import { updateAvatar } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AvatarPicker() {
  const [isUploading, setIsUploading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && user) {
      if (!file.type.startsWith("image/")) {
        import("izitoast").then((iziToast) => {
          iziToast.default.error({
            title: "Помилка",
            message: "Тільки зображення",
            position: "topRight",
          });
        });

        return;
      } else if (file.size > 1 * 1024 * 1024) {
        import("izitoast").then((iziToast) => {
          iziToast.default.error({
            title: "Помилка",
            message: "Максимальна вага файлу 1MB",
            position: "topRight",
          });
        });
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
        import("izitoast").then((iziToast) => {
          iziToast.default.error({
            title: "Помилка",
            message: "Помилка завантаження фото",
            position: "topRight",
          });
        });

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
    </div>
  );
}
