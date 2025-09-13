import ApiTestComponent from "@/components/ApiTestComponent/ApiTestComponent";
import { cookies } from "next/headers";
import { api } from "@/app/api/api";

const Page = () => {
  const checkServerSession = async () => {
    const cookieStore = await cookies();
    console.log(await cookies());
    return await api.get(`/auth/session`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
  };

  return (
    <div>
      Page
      {/* <ApiTestComponent /> */}
    </div>
  );
};

export default Page;
