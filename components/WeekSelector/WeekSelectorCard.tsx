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
      onMouseUp={(e) => e.currentTarget.blur()}
      disabled={isDisabled}
      className={clsx(css.card, {
        [css["is-active"]]: isActive,
      })}
    >
      <p>{weekOrder}</p>
      <p className={clsx(css.text)}>Тиждень</p>
    </button>
  );
}
