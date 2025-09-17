"use client";

import React, { useState, useRef, useEffect } from "react";
import css from "./CustomSelect.module.css";

export interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps {
  options: Option[];
  value: string | number | null;
  onChange: (value: string | number) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Оберіть опцію",
  error = false,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutside = (e: Event) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutside);
    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("pointerdown", handleOutside);
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleToggle = () => {
    if (!disabled) setIsOpen((s) => !s);
  };

  const handleSelect = (option: Option, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div ref={selectRef} className={css.customSelect}>
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`${css.selectButton} ${error ? css.selectError : ""} ${
          disabled ? css.selectDisabled : ""
        }`}
      >
        <span
          className={selectedOption ? css.selectText : css.selectPlaceholder}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <svg
          className={`${css.selectArrow} ${isOpen ? css.selectArrowOpen : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div role="listbox" className={css.selectDropdown}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={value === option.value}
              onPointerDown={(e) => handleSelect(option, e)}
              onClick={(e) => e.preventDefault()}
              className={`${css.selectOption} ${value === option.value ? css.selectOptionSelected : ""}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
