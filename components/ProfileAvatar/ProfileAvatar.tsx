"use client";

import css from "./ProfileAvatar.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
import { updateAvatar } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { ApiError } from "next/dist/server/api-utils";
import "izitoast/dist/css/iziToast.min.css";
import { User } from "@/types/user";

interface ProfileAvatarProps {
  userServer: User;
}

const ProfileAvatar = ({ userServer }: ProfileAvatarProps) => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (error) {
    import("izitoast").then((iziToast) => {
      iziToast.default.error({
        title: "Помилка",
        message: "Щось пішло не так, спробуйте ще раз",
        position: "topRight",
      });
    });
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
        const updatedUser = await updateAvatar(file);

        setUser({
          ...(user || userServer),
          ...updatedUser,
        });
        import("izitoast").then((iziToast) => {
          iziToast.default.success({
            title: "Супер",
            message: "Дані збережено",
            position: "topRight",
          });
        });
      } catch (error) {
        setError((error as ApiError).message);
        import("izitoast").then((iziToast) => {
          iziToast.default.error({
            title: "Помилка",
            message: "Щось пішло не так, спробуйте ще раз",
            position: "topRight",
          });
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className={css.container}>
      <Image
        src={user?.avatarUrl || userServer.avatarUrl}
        alt={user?.name || userServer.name || "User avatar"}
        width={132}
        height={132}
        className={css.avatarUser}
        priority
      />
      <div className={css.wrapper}>
        <h2 className={css.nameUser}>{user?.name || userServer.name}</h2>
        <p className={css.emailUser}>{user?.email || userServer.email}</p>
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
      </div>
    </div>
  );
};

export default ProfileAvatar;
