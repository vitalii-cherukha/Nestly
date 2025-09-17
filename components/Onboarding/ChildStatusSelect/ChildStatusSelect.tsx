"use client";
import { useState } from "react";
import css from "./ChildStatusSelect.module.css";
import { useAuthStore } from "@/lib/store/authStore";

export default function ChildStatusSelect() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "boy", label: "Хлопчик" },
    { value: "girl", label: "Дiвчинка" },
    { value: "unknown", label: "Ще не знаю" },
  ];

  const selectedOption = options.find((opt) => opt.value === user?.babyGender);
  const displayText = selectedOption ? selectedOption.label : "Обeрiть стать";

  const handleOptionClick = (value: string) => {
    if (user) {
      setUser({ ...user, babyGender: value });
      setIsOpen(false);
    }
  };

  return (
    <div className={css.container}>
      <label className={css.label} htmlFor="childStatus">
        Стать дитини
      </label>
      <div className={css.selectWrapper}>
        <div className={css.select} onClick={() => setIsOpen(!isOpen)}>
          <span
            className={!user?.babyGender ? css.placeholder : css.selectText}
          >
            {displayText}
          </span>
          <span className={css.arrow}>{isOpen ? "▲" : "▼"}</span>
        </div>

        {isOpen && (
          <div className={css.dropdown}>
            {options.map((option) => (
              <div
                key={option.value}
                className={`${css.option} ${
                  user?.babyGender === option.value ? css.activeOption : ""
                }`}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
