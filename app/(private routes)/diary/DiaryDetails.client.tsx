"use client";

import { useMediaQuery } from "react-responsive";
// import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import DiaryList from "@/components/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import { useState } from "react";
import type { DiaryEntry } from "@/types/note";

export default function DiaryDetailsClient() {
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  return (
    <main>
      {isDesktop ? (
        <>
          {/* <GreetingBlock /> */}
          <DiaryList onSelectEntry={setSelectedEntry} />

          {selectedEntry ? <DiaryEntryDetails entry={selectedEntry} /> : <></>}
        </>
      ) : (
        // На мобілці лише список
        <DiaryList onSelectEntry={setSelectedEntry} />
      )}
    </main>
  );
}
