"use client";

import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import type { DiaryEntry } from "@/types/note";

interface Props {
  entry: DiaryEntry;
  onClick?: () => void;
}

export default function DiaryEntryCard({ entry, onClick }: Props) {
  const router = useRouter();
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const handleClick = () => {
    if (isDesktop) {
      onClick?.();
    } else {
      router.push(`/diary/${entry._id}`);
    }
  };

  return (
    <div onClick={handleClick}>
      <h3>{entry.title}</h3>
      <p>{new Date(entry.date).toLocaleDateString()}</p>
      {/* <div>
        {entry.emotions.map((emo) => (
          <span key={emo} className="text-lg">
            {emo}
          </span>
        ))}
      </div> */}
    </div>
  );
}
