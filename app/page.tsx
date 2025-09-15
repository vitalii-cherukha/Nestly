import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardClient from "./dashboard.client";
import { getGreeting, getPublicGreeting } from "@/lib/api/clientApi";
import { cookies } from "next/headers";

const Page = async () => {
  const cookieStore = await cookies();
  const isAuth = cookieStore.get("accessToken");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["greeting", isAuth ? "private" : "public"],
    queryFn: isAuth ? getGreeting : getPublicGreeting,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient />
    </HydrationBoundary>
  );
};

export default Page;
