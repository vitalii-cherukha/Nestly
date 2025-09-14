import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingUser {
  dueDate: string;
  babyGender: string;
  avatar: string;

  setDueDate: (date: string) => void;
  setBabyGender: (gender: string) => void;
  setAvatar: (gender: string) => void;
}

export const useOnboardingStore = create<OnboardingUser>()(
  persist(
    (set) => ({
      dueDate: "",
      babyGender: "",
      avatar: "https://ftp.goit.study/img/common/women-default-avatar.jpg",

      setDueDate: (date: string) => set(() => ({ dueDate: date })),
      setBabyGender: (gender: string) => set(() => ({ babyGender: gender })),
      setAvatar: (userPhoto: string) => set(() => ({ avatar: userPhoto })),
    }),
    {
      name: "onboarding-storage",
    }
  )
);
