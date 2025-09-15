"use client";

import { useEffect, useState } from "react";
import { getDiaryEntries } from "@/lib/api/clientApi";
import css from "./DiaryList.module.css";

// import AddDiaryEntryModal from "../AddDiaryEntryModal";
import type { DiaryEntry } from "@/types/note";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useAuthStore } from "@/lib/store/authStore";
import { ApiError } from "next/dist/server/api-utils";

interface Props {
  onSelectEntry?: (entry: DiaryEntry) => void;
}

export default function DiaryList({ onSelectEntry }: Props) {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clearIsAuthenticated = useAuthStore;
  // DiaryList.tsx
  useEffect(() => {
    getDiaryEntries().then((data) => setEntries(data.diaryNotes));
  }, []);

  return (
    <div className={css.diarySection}>
      <div className={css.diaryContainer}>
        <div className={css.topWrapper}>
          <h1 className={css.title}>Ваші записи</h1>
          <button
            className={css.createBtn}
            onClick={() => setIsModalOpen(true)}
          >
            Новий запис
            <IoIosAddCircleOutline className={css.creatIcon} />
          </button>
        </div>

        {entries.length === 0 ? (
          <p>Наразі записи у щоденнику відстні</p>
        ) : (
          <div className={css.diaryNotesWrapper}>
            {entries.map((entry) => (
              <DiaryEntryCard
                key={entry._id}
                entry={entry}
                onClick={() => onSelectEntry?.(entry)}
              />
            ))}
          </div>
        )}

        {/* {isModalOpen && (
        <AddDiaryEntryModal onClose={() => setIsModalOpen(false)} />
      )} */}
      </div>
    </div>
  );
}
