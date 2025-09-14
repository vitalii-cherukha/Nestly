"use client";
import { useQuery } from "@tanstack/react-query";
import css from "./StatusBlock.module.css";

import { useAuthStore } from "@/lib/store/authStore";
import { getGreeting, getPublicGreeting } from "@/lib/api/clientApi";
import { GreetingData } from "@/types/greeting";

const StatusBlock = () => {
  const user = useAuthStore((s) => s.user);

  const { data, isLoading, error } = useQuery<GreetingData>({
    queryKey: ["greeting", user ? "private" : "public"],
    queryFn: user ? getGreeting : getPublicGreeting,
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Не вдалося завантажити дані</p>;
  return (
    <ul className={css.list}>
      <li className={css.item}>
        <h4 className={css.title}>Тиждень</h4>
        <p className={css.text}>{data?.curWeekToPregnant}</p>
      </li>
      <li className={css.item}>
        <h4 className={css.title}>Днів до зустрічі</h4>
        <p className={css.text}>~{data?.daysBeforePregnant}</p>
      </li>
    </ul>
  );
};

export default StatusBlock;
