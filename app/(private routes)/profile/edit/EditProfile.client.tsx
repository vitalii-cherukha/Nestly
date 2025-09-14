"use client";
import AvatarPicker from "@/components/Onboarding/AvatarPicker/AvatarPicker";
import BirthDatePicker from "@/components/Onboarding/BirthDatePicker/BirthDatePicker";
import ChildStatusSelect from "@/components/Onboarding/ChildStatusSelect/ChildStatusSelect";

export default function EditProfileClient() {
  return (
    <div>
      <AvatarPicker />
      <ChildStatusSelect />
      <BirthDatePicker />
    </div>
  );
}
