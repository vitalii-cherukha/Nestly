import LoginForm from "@/components/LoginForm/LoginForm";
import { notFound } from "next/navigation";
import RegisterForm from "@/components/RegisterForm/RegisterForm";

type JourneyPageProps = {
  params: Promise<{ authType?: string[] }>;
};

export default async function JourneyPage({ params }: JourneyPageProps) {
  const { authType } = await params;
  const validTypes = ["login", "register"];
  if (!authType || !validTypes.includes(authType[0])) {
    return notFound();
  }
  return authType[0] === "login" ? <LoginForm /> : <RegisterForm />;
}
