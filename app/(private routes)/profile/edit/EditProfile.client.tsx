"use client";
import AvatarPicker from "@/components/Onboarding/AvatarPicker/AvatarPicker";
import BirthDatePicker from "@/components/Onboarding/BirthDatePicker/BirthDatePicker";
import ChildStatusSelect from "@/components/Onboarding/ChildStatusSelect/ChildStatusSelect";
import css from "./EditProfilePage.module.css";
import { updateProfile } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfileClient() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

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

      import("izitoast").then((iziToast) => {
        iziToast.default.success({
          title: "Супер",
          message: "Дані збережено",
          position: "topRight",
        });
      });
    } catch (error) {
      import("izitoast").then((iziToast) => {
        iziToast.default.error({
          title: "Помилка",
          message: "Щось пішло не так, спробуйте ще раз",
          position: "topRight",
        });
      });
    }
  };

  return (
    <div>
      <form className={css.form} action="submit" onSubmit={handleSubmit}>
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
  );
}
