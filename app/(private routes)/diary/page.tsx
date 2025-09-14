import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getDiaryListServer } from "@/lib/api/serverApi";
import DiaryClient from "./DiaryDetails.client";

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
          <DiaryClient />
        </HydrationBoundary>
      </div>
    </section>
  );
}
