import EditProfileClient from "./EditProfile.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/api/serverApi";

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditProfileClient />
    </HydrationBoundary>
  );
};

export default Page;
