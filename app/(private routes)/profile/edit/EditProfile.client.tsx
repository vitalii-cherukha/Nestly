"use client";
import AvatarPicker from "@/components/Onboarding/AvatarPicker/AvatarPicker";
import BirthDatePicker from "@/components/Onboarding/BirthDatePicker/BirthDatePicker";
import ChildStatusSelect from "@/components/Onboarding/ChildStatusSelect/ChildStatusSelect";
import css from "./EditProfilePage.module.css";
import { useOnboardingStore } from "@/lib/store/userStore";
import { updateProfile } from "@/lib/api/clientApi";

export default function EditProfileClient() {
  const { dueDate, babyGender, avatarUrl } = useOnboardingStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      dueDate,
      babyGender,
      avatarUrl,
    };

    updateProfile(formData);
  };

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <AvatarPicker />
        <ChildStatusSelect />
        <BirthDatePicker />
        <button className={css.button} type="submit">
          Зберегти
        </button>
      </form>
    </div>
  );
}
