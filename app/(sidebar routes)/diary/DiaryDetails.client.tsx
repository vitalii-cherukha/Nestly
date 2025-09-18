"use client";

import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DiaryList from "@/components/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import type { DiaryEntry } from "@/types/note";
import css from "./DiaryDetails.module.css";
import Container from "@/components/Container/Container";
import Section from "@/components/Section/Section";

export default function DiaryDetailsClient() {
  const isDesktop = useMediaQuery({ minWidth: 1440 });
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const router = useRouter();

  const handleSelectEntry = (entry: DiaryEntry) => {
    if (isDesktop) {
      setSelectedEntry(entry);
    } else {
      router.push(`/diary/${entry._id}`);
    }
  };

  const handleUpdate = () => {
    setSelectedEntry(null);
  };

  return (
    <Section>
      <Container>
        <GreetingBlock />
        <main className={css.diaryDescWrapper}>
          <DiaryList onSelectEntry={handleSelectEntry} />

          {isDesktop && selectedEntry && (
            <DiaryEntryDetails entry={selectedEntry} onUpdate={handleUpdate} />
          )}
        </main>
      </Container>
    </Section>
  );
}
