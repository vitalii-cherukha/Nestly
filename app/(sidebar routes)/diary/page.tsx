import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getDiaryListServer } from "@/lib/api/serverApi";
import DiaryDetailsClient from "./DiaryDetails.client";
import type { Metadata } from "next";

// MetaData

export const generateMetadata = async (): Promise<Metadata> => {
  const { diaryNotes } = await getDiaryListServer();

  return {
    title: "Ваші записи",
    description: `У вас ${diaryNotes.length} записів у щоденнику`,
    openGraph: {
      title: "Ваші записи",
      description: `У вас ${diaryNotes.length} записів у щоденнику`,
      url: "https://nestly-alpha.vercel.app/diary",
      images: [
        {
          url: "../../../public/logo.png",
          width: 120,
          height: 120,
          alt: "Ваші записи",
        },
      ],
    },
  };
};

export default async function DiaryPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["diary"],
    queryFn: () => getDiaryListServer(),
  });

  return (
    <section>
      <div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <DiaryDetailsClient />
        </HydrationBoundary>
      </div>
    </section>
  );
}
