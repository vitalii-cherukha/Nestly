"use client";

import { useState } from "react";
import type { DiaryEntry } from "@/types/note";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
// import AddDiaryEntryModal from "../AddDiaryEntryModal";
import css from "./DiaryEntryDetails.module.css";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteForever } from "react-icons/md";

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
      <div className={css.diaryDetailsCardWrapper}>
        <div className={css.diaryDetailsContentWrapper}>
          <div className={css.diaryDetailsTopWrapper}>
            <h2 className={css.diaryDetailsTitle}>{entry.title}</h2>
            <button
              onClick={() => setIsEditModal(true)}
              className={css.diaryDetailsEditBtn}
            >
              <TbEdit className={css.editBtn} />
            </button>
          </div>
          <div className={css.diaryDetailsDataWrapper}>
            <p className={css.diaryDetailsDataText}>
              {new Date(entry.date).toLocaleDateString()}
            </p>
            <button
              onClick={() => setIsDeleteModal(true)}
              className={css.diaryDetailsDeleteBtn}
            >
              <MdOutlineDeleteForever className={css.deleteBtn} />
            </button>
          </div>
          <p className={css.diaryDetailsDescription}>{entry.description}</p>

          <div className={css.diaryEmotionsWrapper}>
            <ul>
              {entry.emotions.map((emo, index) => (
                <li key={`${emo._id}-${index}`} className={css.emotionsItem}>
                  {emo.title}
                </li>
              ))}
            </ul>
          </div>
          {/* 
          <div className={css.diaryDetailsDescBtnWrapper}>
            <button
              onClick={() => setIsEditModal(true)}
              className={css.diaryDetailsDescEditBtn}
            >
              Редагувати
            </button>
            <button
              onClick={() => setIsDeleteModal(true)}
              className={css.diaryDetailsDescDeleteBtn}
            >
              Видалити
            </button>
          </div> */}

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
      </div>
    </div>
  );
}
