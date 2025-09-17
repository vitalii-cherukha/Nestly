// import DashboardClient from "./dashboard.client";

// const Page = async () => {

//   return (
//     <>
//       <DashboardClient />
//     </>
//   );
// };

// export default Page;
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardClient from "./dashboard.client";
import { getGreeting, getPublicGreeting, getTasks } from "@/lib/api/serverApi";
import { cookies } from "next/headers";

const Page = async () => {
  const cookieStore = await cookies();
  const isAuth = Boolean(cookieStore.get("accessToken"));
  const authType = isAuth ? "private" : "public";
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["greeting", authType],
    queryFn: isAuth ? getGreeting : getPublicGreeting,
  });
  await queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient authType={authType} />
    </HydrationBoundary>
  );
};

export default Page;
