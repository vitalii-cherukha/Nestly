"use client";

import { useRouter } from "next/navigation";
import css from "./LoginForm.module.css";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { login } from "@/lib/api/clientApi";
import { ApiError } from "next/dist/server/api-utils";
import { LoginData } from "@/types/user";
import Link from "next/link";
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  interface InitialValues {
    email: string;
    password: string;
  }

  const initialValues: InitialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email обов'язковий")
      .email("Введіть коректний email")
      .max(100, "Email не повинен перевищувати 100 символів")
      .trim(),

    password: Yup.string()
      .required("Пароль обов'язковий")
      .min(8, "Пароль повинен містити мінімум 8 символів")
      .max(128, "Пароль не повинен перевищувати 128 символів")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Пароль повинен містити хоча б одну малу літеру, одну велику літеру та одну цифру"
      )
      .trim(),
  });

  const handleSubmit = async (
    values: InitialValues,
    { setSubmitting }: FormikHelpers<InitialValues>
  ) => {
    try {
      setError("");
      const user = await login(values as LoginData);

      if (user) {
        setUser(user);
        router.push("/");
      }
    } catch (error) {
      setError((error as ApiError).message ?? "Щось пішло не так");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={initialValues}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <h1 className={css.title}>Вхід</h1>

          <div className={css.inputGroup}>
            <label htmlFor="email">Пошта</label>
            <Field
              id="email"
              type="email"
              name="email"
              placeholder="Пошта"
              className={css.input}
            />
            <ErrorMessage name="email" component="div" />
          </div>

          <div className={css.inputGroup}>
            <label htmlFor="password">Пароль</label>
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="Пароль"
              className={css.input}
            />
            <ErrorMessage name="password" component="div" />
          </div>

          <button
            type="submit"
            className={css.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Загрузка..." : "Увійти"}
          </button>

          {error && (
            <span
              style={{
                color: "#ef4444",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {error}
            </span>
          )}

          <div className={css.registerPrompt}>
            <span>Немає аккаунту? </span>
            <Link href="/auth/register" className={css.registerLink}>
              Зареєструватися
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
