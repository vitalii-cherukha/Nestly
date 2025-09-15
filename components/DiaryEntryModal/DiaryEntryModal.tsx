"use client";

import { useEffect, useCallback } from "react";
import css from "./DiaryEntryModal.module.css";
import { DiaryEntry } from "@/types/note";
import { DiaryEntryForm } from "../DiaryEntryForm/DiaryEntryForm";
import { IoIosClose } from "react-icons/io";
import { createPortal } from "react-dom";

interface DiaryEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry?: DiaryEntry;
  onSuccess: () => void;
}

export const DiaryEntryModal: React.FC<DiaryEntryModalProps> = ({
  isOpen,
  onClose,
  entry,
  onSuccess,
}) => {
  const onEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", onEsc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onEsc]);

  if (!isOpen) return null;

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) onClose();
  };

  const titleText = entry ? "Редагувати запис" : "Новий запис";

  return createPortal(
    <div
      className={css.backdrop}
      onClick={onBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <h2 className={css.title}>{titleText}</h2>

        <div className={css.containerForm}>
          <DiaryEntryForm
            entry={entry}
            onSuccess={() => {
              onSuccess();
              onClose();
            }}
            onCancel={onClose}
          />
        </div>

        <button
          className={css.closeButton}
          onClick={onClose}
          type="button"
          aria-label="Закрити модальне вікно"
        >
          <IoIosClose />
        </button>
      </div>
    </div>,
    document.body
  );
};
