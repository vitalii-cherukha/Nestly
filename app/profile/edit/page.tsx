import EditProfileClient from "./EditProfile.client";
import css from "./EditProfilePage.module.css";
import Image from "next/image";

export default function EditProfilePage() {
  return (
    <div className={css.pageContainer}>
      <div className={css.leftPanel}>
        <div className={css.formWrapper}>
          <h1 className={css.title}>Давайте познаймимось ближче</h1>
          <EditProfileClient />
        </div>
      </div>

      <div className={css.rightPanel}>
        <Image
          className={css.image}
          src="/sign-up-add.jpg"
          alt="Tree"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
    </div>
  );
}
