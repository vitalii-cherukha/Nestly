import React, { useRef, useEffect } from "react";
import { WeekSelectorCard } from "./WeekSelectorCard";
import css from "./WeekSelector.module.css";
import clsx from "clsx";

interface Props {
  weekQty: number;
  selectedWeek: number;
  onCardClick: (week: number) => void;
  curWeekToPregnant: number;
}

export function WeekSelector({
  selectedWeek,
  weekQty,
  onCardClick,
  curWeekToPregnant,
}: Props) {
  const weekArray = [...new Array(weekQty)];
  const containerRef = useRef<HTMLUListElement>(null);
  const currentWeekRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    if (currentWeekRef.current) {
      currentWeekRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [curWeekToPregnant]);

  const renderCollection = (_: unknown, i: number) => {
    const currentWeek = i + 1;
    return (
      <li
        className={css["list-item"]}
        key={i}
        ref={currentWeek === selectedWeek ? currentWeekRef : null}
      >
        <WeekSelectorCard
          onCardClick={() => onCardClick(currentWeek)}
          weekOrder={currentWeek}
          isDisabled={currentWeek > curWeekToPregnant}
          isActive={currentWeek === selectedWeek}
        />
      </li>
    );
  };

  return (
    <ul ref={containerRef} className={clsx(css.list)}>
      {weekArray.map(renderCollection)}
    </ul>
  );
}
