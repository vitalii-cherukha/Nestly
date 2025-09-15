import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getDiaryListServer } from "@/lib/api/serverApi";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import { Metadata } from "next";

// MetaData

interface DiaryIdPageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: DiaryIdPageProps): Promise<Metadata> => {
  const { id } = await params;

  const { diaryNotes } = await getDiaryListServer();
  const note = diaryNotes.find((n) => n._id === id);

  if (!note) {
    return {
      title: "Запис не знайдено",
      description: "Цей запис не існує",
    };
  }

  return {
    title: note.title,
    description: note.description.slice(0, 15),
    openGraph: {
      title: note.title,
      description: note.description.slice(0, 15),
      url: `https://nestly-alpha.vercel.app/diary/${id}`,
      images: [
        {
          url: "../../../public/logo.png",
          width: 120,
          height: 120,
          alt: note.title,
        },
      ],
    },
  };
};

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
