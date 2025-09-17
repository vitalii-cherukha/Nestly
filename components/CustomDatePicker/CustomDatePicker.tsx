"use client";

import { useState, useRef, useEffect } from "react";
import css from "./CustomDatePicker.module.css";

interface CustomDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  minDate?: Date;
}

const CustomDatePicker = ({
  value,
  onChange,
  placeholder = "Оберіть дату",
  error = false,
  minDate,
}: CustomDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    if (value) {
      setDisplayValue(formatDisplayDate(value));
    } else {
      setDisplayValue("");
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.showPicker?.();
      }, 0);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    onChange(selectedDate);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className={css.container} ref={containerRef}>
      <div
        className={`${css.trigger} ${error ? css.error : ""} ${isOpen ? css.open : ""}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span
          className={`${css.value} ${!displayValue ? css.placeholder : ""}`}
        >
          {displayValue || placeholder}
        </span>

        <svg
          className={`${css.selectArrow} ${isOpen ? css.selectArrowOpen : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={handleDateChange}
        min={minDate ? minDate.toISOString().split("T")[0] : undefined}
        className={css.hiddenInput}
        tabIndex={-1}
      />
    </div>
  );
};

export default CustomDatePicker;
