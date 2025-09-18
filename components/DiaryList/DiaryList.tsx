"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDiaryEntries as getDiaryEntriesClient } from "@/lib/api/clientApi";
import css from "./DiaryList.module.css";
import type { DiaryEntry } from "@/types/note";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import { DiaryEntryModal } from "../DiaryEntryModal/DiaryEntryModal";

// Тип відповіді від API
interface GetDiaryEntriesRep {
  diaryNotes: DiaryEntry[];
}

interface Props {
  onSelectEntry?: (entry: DiaryEntry) => void;
}

// Обгортка для React Query
const getDiaryEntriesQuery = async (): Promise<GetDiaryEntriesRep> => {
  return getDiaryEntriesClient();
};

export default function DiaryList({ onSelectEntry }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery<GetDiaryEntriesRep>({
    queryKey: ["diaryEntries"],
    queryFn: getDiaryEntriesQuery,
  });

  const entries: DiaryEntry[] = data?.diaryNotes ?? [];

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Сталася помилка при завантаженні</p>;

  return (
    <div className={css.diaryContainer}>
      <div className={css.topWrapper}>
        <h1 className={css.title}>Ваші записи</h1>
        <button className={css.createBtn} onClick={() => setIsModalOpen(true)}>
          Новий запис
          <IoIosAddCircleOutline className={css.creatIcon} />
        </button>
      </div>

      {entries.length === 0 ? (
        <p>Наразі записи у щоденнику відсутні</p>
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

      {isModalOpen && (
        <DiaryEntryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            refetch(); // 🔑 після створення нового запису
          }}
        />
      )}
    </div>
  );
}
