"use client";

import css from "./ProfileEditForm.module.css";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "@/lib/store/authStore";
import { updateProfile } from "@/lib/api/clientApi";
import { ApiError } from "next/dist/server/api-utils";
import CustomSelect from "../CustomSelect/CustomSelect";
import { User } from "@/types/user";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import { useState, useRef } from "react";

interface InitialValues {
  name: string;
  email: string;
  babyGender: string;
  dueDate: string;
}

interface ProfileEditProps {
  userServer: User;
}

const ProfileEditForm = ({ userServer }: ProfileEditProps) => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toastShownRef = useRef(false);

  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 9);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Введіть ім’я")
      .min(3, "Мінімальна довжина 3 символи")
      .max(20, "Максимальна довжина 20 символів"),

    email: Yup.string().email("Некоректна пошта").required("Введіть пошту"),

    babyGender: Yup.string()
      .required("Оберіть стать")
      .oneOf(["boy", "girl", "unknown"]),

    dueDate: Yup.date()
      .typeError("Невірний формат дати")
      .required("Оберіть дату")
      .min(minDate, "Дата не може бути раніше сьогоднішнього дня")
      .max(maxDate, "Дата не може бути пізніше ніж через 9 місяців"),
  });

  const handleSubmit = async (
    values: InitialValues,
    actions: FormikHelpers<InitialValues>
  ) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    toastShownRef.current = false;

    try {
      const cleanValues = {
        ...values,
        name: values.name.trim(),
        email: values.email.trim(),
      };

      const updatedUser = await updateProfile(cleanValues);

      setUser({
        ...user,
        ...updatedUser,
      });

      if (!toastShownRef.current) {
        toastShownRef.current = true;
        import("izitoast").then((iziToast) => {
          iziToast.default.success({
            title: "Успіх",
            message: "Дані успішно збережено",
            position: "topRight",
          });
        });
      }
    } catch (err) {
      console.error("Profile update error:", err);

      const message =
        err instanceof Error
          ? err.message
          : (err as ApiError)?.message || "Щось пішло не так, спробуйте ще раз";

      if (!toastShownRef.current) {
        toastShownRef.current = true;
        import("izitoast").then((iziToast) => {
          iziToast.default.error({
            title: "Помилка",
            message,
            position: "topRight",
          });
        });
      }
    } finally {
      setIsSubmitting(false);
      actions.setSubmitting(false);
      setTimeout(() => {
        toastShownRef.current = false;
      }, 1000);
    }
  };

  const initialValues = {
    name: user?.name || userServer.name || "",
    email: user?.email || userServer.email || "",
    babyGender: user?.babyGender || userServer.babyGender || "",
    dueDate: user?.dueDate || userServer.dueDate || "",
  };

  return (
    <div className={css.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
        enableReinitialize={true}
      >
        {({
          handleReset,
          errors,
          touched,
          values,
          setFieldValue,
          isValid,
          dirty,
        }) => (
          <Form className={css.form}>
            <label className={css.label}>
              Ім`я
              <Field
                name="name"
                type="text"
                className={`${css.input} ${touched.name && errors.name ? css.inputError : ""}`}
                placeholder="Введіть своє ім'я"
              />
              <ErrorMessage name="name" component="div" className={css.error} />
            </label>

            <label className={css.label}>
              Пошта
              <Field
                name="email"
                type="email"
                className={`${css.input} ${touched.email && errors.email ? css.inputError : ""}`}
                placeholder="Введіть свою пошту"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              Стать дитини
              <CustomSelect
                options={[
                  { value: "girl", label: "Дівчинка" },
                  { value: "boy", label: "Хлопчик" },
                  { value: "unknown", label: "Ще не знаю" },
                ]}
                value={values.babyGender}
                onChange={(value) => setFieldValue("babyGender", value)}
                placeholder="Оберіть стать"
                error={!!(touched.babyGender && errors.babyGender)}
              />
              <ErrorMessage
                name="babyGender"
                component="div"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              Планова дата пологів
              <CustomDatePicker
                value={values.dueDate}
                onChange={(value) => setFieldValue("dueDate", value)}
                placeholder="Оберіть дату"
                error={!!(touched.dueDate && errors.dueDate)}
                minDate={minDate}
              />
              <ErrorMessage
                name="dueDate"
                component="div"
                className={css.error}
              />
            </label>

            <div className={css.actions}>
              <button
                type="button"
                onClick={() => {
                  handleReset();
                  toastShownRef.current = false;
                }}
                className={css.btnCancel}
                disabled={isSubmitting}
              >
                Відмінити зміни
              </button>
              <button
                type="submit"
                className={css.btnSave}
                disabled={isSubmitting || !isValid || !dirty}
              >
                {isSubmitting ? "Збереження..." : "Зберегти зміни"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileEditForm;
