"use client";

import { useState } from "react";
import type { DiaryEntry } from "@/types/note";
// import AddDiaryEntryModal from "../AddDiaryEntryModal";
// import ConfirmationModal from "../ConfirmationModal";

interface Props {
  entry: DiaryEntry;
}

export default function DiaryEntryDetails({ entry }: Props) {
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  return (
    <div>
      <h2>{entry.title}</h2>
      <p>{new Date(entry.date).toLocaleDateString()}</p>
      <p>{entry.description}</p>

      {/* <div>
        {entry.emotions.map((emo) => (
          <span key={emo}>{emo}</span>
        ))}
      </div> */}

      <div>
        <button onClick={() => setIsEditModal(true)}>Редагувати</button>
        <button onClick={() => setIsDeleteModal(true)}>Видалити</button>
      </div>

      {/* {isEditModal && (
        <AddDiaryEntryModal
          entry={entry}
          onClose={() => setIsEditModal(false)}
        />
      )}
      {isDeleteModal && (
        <ConfirmationModal
          entryId={entry._id}
          onClose={() => setIsDeleteModal(false)}
        />
      )} */}
    </div>
  );
}
