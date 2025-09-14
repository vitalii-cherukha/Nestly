import clsx from "clsx";
import css from "./WeekSelectorCard.module.css";

interface Props {
  isActive: boolean;
  isDisabled: boolean;
  weekOrder: number;
  onCardClick: () => void;
}

export function WeekSelectorCard({
  isActive,
  isDisabled,
  weekOrder,
  onCardClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onCardClick}
      disabled={isDisabled}
      className={clsx(css.card, {
        [css["is-active"]]: isActive,
      })}
    >
      <p>{weekOrder}</p>
      <p>Тиждень</p>
    </button>
  );
}
