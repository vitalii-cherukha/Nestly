"use client";

import { useMediaQuery } from "react-responsive";
// import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import DiaryList from "@/components/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import { useState } from "react";
import type { DiaryEntry } from "@/types/note";

export default function DiaryClient() {
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  return (
    <main>
      {isDesktop ? (
        <>
          <section>
            {/* <GreetingBlock /> */}
            <DiaryList onSelectEntry={setSelectedEntry} />
          </section>
          <section>
            {selectedEntry ? (
              <DiaryEntryDetails entry={selectedEntry} />
            ) : (
              <div>Наразі записи у щоденнику відсутні</div>
            )}
          </section>
        </>
      ) : (
        // На мобілці лише список
        <DiaryList onSelectEntry={setSelectedEntry} />
      )}
    </main>
  );
}
