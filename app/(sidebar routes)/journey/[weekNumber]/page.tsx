import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getWeekInfoBaby, getWeekInfoMom } from "@/lib/api/serverApi";
import { getWeekGreeting } from "@/lib/api/clientApi";
import JourneyDetails from "./page.client";

type Props = {
  params: Promise<{ weekNumber: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { weekNumber } = await params;
  const babyInfo = await getWeekInfoBaby({ weekNumber });
  const momInfo = await getWeekInfoMom({ weekNumber });

  if (!momInfo || !babyInfo) {
    notFound();
  }

  const titlePlaceholder = `Week info - ${weekNumber}`;
  const descriptionPlaceholder = `Mom's feeling ${momInfo.feelings.states.map((state) => `${state}`).join(", ")}`;

  return {
    title: titlePlaceholder,
    description: descriptionPlaceholder,
    openGraph: {
      title: titlePlaceholder,
      description: descriptionPlaceholder,
      url: `journey/${weekNumber}`,
      images: {
        url: babyInfo.image,
        width: 1200,
        height: 630,
        alt: babyInfo.analogy,
      },
    },
  };
}

export default async function JourneyPage({ params }: Props) {
  const { weekNumber } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["greeting"],
    queryFn: getWeekGreeting,
  });

  await queryClient.prefetchQuery({
    queryKey: ["weeks", weekNumber, "baby"],
    queryFn: () => {
      return getWeekInfoBaby({ weekNumber });
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["weeks", weekNumber, "mom"],
    queryFn: () => {
      return getWeekInfoMom({ weekNumber });
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JourneyDetails />
    </HydrationBoundary>
  );
}
