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
  const [currentMonth, setCurrentMonth] = useState(() => {
    // Початковий місяць - поточний або місяць вибраної дати
    if (value) {
      const selectedDate = new Date(value);
      return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    }
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const containerRef = useRef<HTMLDivElement>(null);

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
    if (!isOpen) {
      // При відкритті ініціалізуємо правильний місяць
      if (value) {
        // Якщо є вибрана дата - показуємо її місяць
        const selectedDate = new Date(value);
        setCurrentMonth(
          new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
        );
      } else {
        // Якщо дати немає - показуємо поточний місяць
        const today = new Date();
        setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
      }
    }
    setIsOpen(!isOpen);
  };

  const handleDateSelect = (dateString: string) => {
    onChange(dateString);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );
    setCurrentMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
    setCurrentMonth(newMonth);
  };

  const canGoToPrevMonth = () => {
    const today = new Date();
    const currentMonthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    return currentMonth > currentMonthStart;
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    const monthNames = [
      "Січень",
      "Лютий",
      "Березень",
      "Квітень",
      "Травень",
      "Червень",
      "Липень",
      "Серпень",
      "Вересень",
      "Жовтень",
      "Листопад",
      "Грудень",
    ];

    const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

    // Пусті клітинки
    for (
      let i = 0;
      i < (startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1);
      i++
    ) {
      days.push(<div key={`empty-${i}`} className={css.emptyDay}></div>);
    }

    // Дні місяця
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

      const isSelected = value === dateString;
      const isToday = new Date().toDateString() === date.toDateString();
      const isDisabled = minDate && date < minDate;

      let className = css.day;
      if (isDisabled) {
        className += ` ${css.dayDisabled}`;
      } else if (isSelected) {
        className += ` ${css.daySelected}`;
      } else if (isToday) {
        className += ` ${css.dayToday}`;
      }

      days.push(
        <button
          key={day}
          type="button"
          className={className}
          onClick={() => !isDisabled && handleDateSelect(dateString)}
          disabled={isDisabled}
        >
          {day}
        </button>
      );
    }

    return (
      <div className={css.calendar}>
        <div className={css.calendarHeader}>
          <button
            type="button"
            className={`${css.navButton} ${!canGoToPrevMonth() ? css.navButtonDisabled : ""}`}
            onClick={handlePrevMonth}
            disabled={!canGoToPrevMonth()}
            title="Попередний місяць"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path
                d="M7 1L2 6L7 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <span className={css.monthYear}>
            {monthNames[month]} {year}
          </span>

          <button
            type="button"
            className={css.navButton}
            onClick={handleNextMonth}
            title="Наступний місяць"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path
                d="M1 1L6 6L1 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className={css.weekDays}>
          {dayNames.map((dayName) => (
            <div key={dayName} className={css.weekDay}>
              {dayName}
            </div>
          ))}
        </div>

        <div className={css.daysGrid}>{days}</div>
      </div>
    );
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

      {/* Календар з навігацією */}
      {isOpen && <div className={css.dropdown}>{renderCalendar()}</div>}
    </div>
  );
};

export default CustomDatePicker;
