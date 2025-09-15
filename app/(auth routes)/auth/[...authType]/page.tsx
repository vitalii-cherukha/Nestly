import LoginForm from "@/components/LoginForm/LoginForm";
import { notFound } from "next/navigation";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import Link from "next/link";
import Image from "next/image";
import css from "./Page.module.css";
import Logo from "@/components/Logo/Logo";

type AuthPageProps = {
  params: Promise<{ authType?: string[] }>;
};

export default async function AuthPage({ params }: AuthPageProps) {
  const { authType } = await params;
  const validTypes = ["login", "register"];
  if (!authType || !validTypes.includes(authType[0])) {
    return notFound();
  }

  return authType[0] === "login" ? (
    <div className={css.container}>
      <Logo />

      <div className={css.formSection}>
        <LoginForm />
      </div>

      <div className={css.imageSection}>
        <Image
          src="/sign-in-img.jpg"
          alt="Яйця в гнiздi"
          width={720}
          height={900}
          priority
        />
      </div>
    </div>
  ) : (
    <div className={css.container}>
      <Logo />
      <div className={css.formSection}>
        <RegisterForm />
      </div>

      <div className={css.imageSection}>
        <Image
          src="/sign-up-img.jpg"
          alt="Лелека"
          width={720}
          height={900}
          priority
        />
      </div>
    </div>
  );
}
