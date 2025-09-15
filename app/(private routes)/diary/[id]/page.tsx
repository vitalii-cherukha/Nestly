import { getDiaryListServer } from "@/lib/api/serverApi";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";

export default async function DiaryEntryPage({
  params,
}: {
  params: { id: string };
}) {
  const { diaryNotes } = await getDiaryListServer(); // <-- беремо масив

  const entry = diaryNotes.find((e) => e._id === params.id);

  if (!entry) return <p>Запис не знайдено</p>;

  return <DiaryEntryDetails entry={entry} />;
}
