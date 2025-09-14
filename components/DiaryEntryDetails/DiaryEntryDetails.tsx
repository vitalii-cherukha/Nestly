"use client";

import { useState } from "react";
import type { DiaryEntry } from "@/types/note";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
// import AddDiaryEntryModal from "../AddDiaryEntryModal";
import css from "./DiaryEntryDetails.module.css"

interface Props {
  entry: DiaryEntry;
}

export default function DiaryEntryDetails({ entry }: Props) {
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const handleDeleteConfirm = () => {
    // тут можна викликати API для видалення entry
    console.log("Deleting entry with id:", entry._id);
    setIsDeleteModal(false);
  };

  return (
    <div className={css.diaryDetailsWrapper}>
      <h2>{entry.title}</h2>
      <p>{new Date(entry.date).toLocaleDateString()}</p>
      <p>{entry.description}</p>

      <div className={css.diaryEmotionsWrapper}>
        <ul>
          {entry.emotions.map((emo, index) => (
            <li key={`${emo._id}-${index}`} className={css.emotionsItem}>
              {emo.title}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={() => setIsEditModal(true)}>Редагувати</button>
        <button onClick={() => setIsDeleteModal(true)}>Видалити</button>
      </div>

      {/* {isEditModal && (
        <AddDiaryEntryModal
          entry={entry}
          onClose={() => setIsEditModal(false)}
        />
      )} */}
      {/* Модалка підтвердження видалення */}
      {isDeleteModal && (
        <ConfirmationModal
          title="Ви впевнені, що хочете видалити запис?"
          confirmButtonText="Так, видалити"
          cancelButtonText="Скасувати"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setIsDeleteModal(false)}
        />
      )}
    </div>
  );
}
