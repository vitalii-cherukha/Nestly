"use client";

import { useEffect, useState } from "react";
import { getDiaryEntries } from "@/lib/api/clientApi";

// import AddDiaryEntryModal from "../AddDiaryEntryModal";
import type { DiaryEntry } from "@/types/note";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";

interface Props {
  onSelectEntry?: (entry: DiaryEntry) => void;
}

export default function DiaryList({ onSelectEntry }: Props) {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getDiaryEntries().then((data) => setEntries(data.diaryNotes));
  }, []);

  return (
    <div>
      <div>
        <h1>Щоденник</h1>
        <button onClick={() => setIsModalOpen(true)}>Новий запис</button>
      </div>

      {entries.length === 0 ? (
        <p>Наразі записи у щоденнику відстні</p>
      ) : (
        <div>
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
  );
}
