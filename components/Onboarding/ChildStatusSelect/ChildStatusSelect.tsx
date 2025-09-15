"use client";
import { useState } from "react";
import css from "./ChildStatusSelect.module.css";
import { useOnboardingStore } from "@/lib/store/onboardingStore";

export default function ChildStatusSelect() {
  const babyGender = useOnboardingStore((state) => state.babyGender);
  const setBabyGender = useOnboardingStore((state) => state.setBabyGender);
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "boy", label: "Хлопчик" },
    { value: "girl", label: "Дiвчинка" },
    { value: "none", label: "Ще не знаю" },
  ];

  const selectedOption = options.find((opt) => opt.value === babyGender);
  const displayText = selectedOption ? selectedOption.label : "Обeрiть стать";

  const handleOptionClick = (value: string) => {
    setBabyGender(value);
    setIsOpen(false);
  };

  return (
    <div className={css.container}>
      <label className={css.label} htmlFor="childStatus">
        Стать дитини
      </label>
      <div className={css.selectWrapper}>
        <div className={css.select} onClick={() => setIsOpen(!isOpen)}>
          <span className={!babyGender ? css.placeholder : css.selectText}>
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
                  babyGender === option.value ? css.activeOption : ""
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
