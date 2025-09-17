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
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (user?.babyGender) {
    //   console.log("Оберіть стать дитини");
    //   return;
    // }

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

    updateProfile(formData);
    router.replace("/");
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
