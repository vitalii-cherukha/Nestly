"use client";

import { useEffect, useState } from "react";
import { fetchDiaryById } from "@/lib/api/clientApi";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import type { DiaryEntry } from "@/types/note";

interface Props {
  params: { entryId: string };
}

export default function DiaryEntryPage({ params }: Props) {
  const [entry, setEntry] = useState<DiaryEntry | null>(null);

  useEffect(() => {
    fetchDiaryById(params.entryId).then(setEntry);
  }, [params.entryId]);

  if (!entry) {
    return <div>Завантаження...</div>;
  }

  return <DiaryEntryDetails entry={entry} />;
}
