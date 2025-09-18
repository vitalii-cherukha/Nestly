"use client";
import css from "./authLayout.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    router.refresh();
    setLoading(false);
  }, [router]);

  return (
    <div className={css.authLayout}>
      <>{loading ? <Loader /> : <main>{children}</main>}</>;
    </div>
  );
};

export default AuthLayout;
