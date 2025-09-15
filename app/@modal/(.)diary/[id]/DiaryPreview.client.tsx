"use client";

import DiaryList from "@/components/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import { useState } from "react";
import type { DiaryEntry } from "@/types/note";

export default function DiaryClient() {
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  return (
    <main>
      <DiaryList onSelectEntry={setSelectedEntry} />

      {selectedEntry ? <DiaryEntryDetails entry={selectedEntry} /> : <></>}
    </main>
  );
}
