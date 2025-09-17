"use client";
import { uk } from "date-fns/locale";
import { useEffect, useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./BirthDatePicker.module.css";
import { useAuthStore } from "@/lib/store/authStore";

registerLocale("uk", uk);

export default function BirthDatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user?.dueDate) {
      setSelectedDate(new Date(user?.dueDate));
    }
  }, [user?.dueDate]);

  const handleChange = (date: Date | null) => {
    if (date && user) {
      setSelectedDate(date);
      setUser({ ...user, dueDate: date.toLocaleDateString("uk-UA") });
    }
  };

  const today = new Date().toLocaleDateString("uk-UA");
  const userDate = user?.dueDate
    ? new Date(user.dueDate).toLocaleDateString("uk-UA")
    : today;

  return (
    <div>
      <label className={css.label}>Планова дата пологів</label>
      <div className={css.datepickerWrapper}>
        <ReactDatePicker
          selected={selectedDate}
          onChange={handleChange}
          dateFormat="dd.MM.yyyy"
          placeholderText={userDate}
          minDate={new Date()}
          locale={uk}
        />
      </div>
    </div>
  );
}
