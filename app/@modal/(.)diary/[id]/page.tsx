// app/diary/[id]/page.tsx
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import { fetchDiaryByIdServer } from "@/lib/api/serverApi";

interface Props {
  params: { id: string };
}

export default async function DiaryEntryPage({ params }: Props) {
  const entry = await fetchDiaryByIdServer(params.id);

  if (!entry) {
    return <div>Запись не найдена или доступ запрещён</div>;
  }

  return <DiaryEntryDetails entry={entry} />;
}
