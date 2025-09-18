"use client";

import AvatarPicker from "@/components/Onboarding/AvatarPicker/AvatarPicker";
import BirthDatePicker from "@/components/Onboarding/BirthDatePicker/BirthDatePicker";
import ChildStatusSelect from "@/components/Onboarding/ChildStatusSelect/ChildStatusSelect";
import css from "./EditProfilePage.module.css";
import { updateProfile } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/api/clientApi";
import { useEffect } from "react";

export default function EditProfileClient() {
  const userState = useAuthStore((state) => state.user);
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
    refetchOnMount: false,
  });
  const setUser = useAuthStore((state) => state.setUser);
  useEffect(() => {
    if (data) setUser(data);
  }, [data, setUser]);
  if (!data) {
    return <p>Сталась помилка! Перезавантажте сторінку</p>;
  }
  const user = data ?? userState;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = {
        dueDate:
          user?.dueDate && user?.dueDate.includes(".")
            ? (() => {
                const [day, month, year] = user?.dueDate.split(".");
                if (day && month && year) {
                  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
                }
                return user?.dueDate;
              })()
            : user?.dueDate,
        babyGender: user?.babyGender,
      };

      await updateProfile(formData);
      router.replace("/");

      const { default: iziToast } = await import("izitoast");
      iziToast.success({
        title: "Супер",
        message: "Дані збережено",
        position: "topRight",
      });
    } catch {
      const { default: iziToast } = await import("izitoast");
      iziToast.error({
        title: "Помилка",
        message: "Щось пішло не так, спробуйте ще раз",
        position: "topRight",
      });
    }
  };

  return (
    <div className={css.pageContainer}>
      <div className={css.leftPanel}>
        <div className={css.formWrapper}>
          <h1 className={css.title}>Давайте познаймимось ближче</h1>
          <div>
            <form className={css.form} onSubmit={handleSubmit}>
              <AvatarPicker />
              <div className={css.selectWrapper}>
                <ChildStatusSelect />
                <BirthDatePicker />
              </div>

              <button className={css.button} type="submit">
                Зберегти
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className={css.rightPanel}>
        <Image
          className={css.image}
          src="/sign-up-add.jpg"
          alt="Tree"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
    </div>
  );
}
