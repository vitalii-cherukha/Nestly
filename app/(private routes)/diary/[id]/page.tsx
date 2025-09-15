import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getDiaryListServer } from "@/lib/api/serverApi";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";

interface DiaryIdPageProps {
  params: Promise<{ id: string }>;
}

export default async function DiaryEntryPage({ params }: DiaryIdPageProps) {
  // Розпаковуємо params асинхронно для Некста
  const { id } = await params;

  const queryClient = new QueryClient();

  // Префетч всього списку на сервері
  await queryClient.prefetchQuery({
    queryKey: ["diary"],
    queryFn: () => getDiaryListServer(),
  });

  // Дістаємо масив для знаходження конкретного запису
  const { diaryNotes } = await getDiaryListServer();
  const entry = diaryNotes.find((e) => e._id === id);

  if (!entry) return <p>Запис не знайдено</p>;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DiaryEntryDetails entry={entry} />
    </HydrationBoundary>
  );
}
