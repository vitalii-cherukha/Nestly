import Section from "@/components/Section/Section";
import EditProfileClient from "./EditProfile.client";
import Container from "@/components/Container/Container";
import css from "./EditProfilePage.module.css";
import Image from "next/image";

export default function EditProfilePage() {
  return (
    <Section>
      <div className={css.onBoardingWrapper}>
        <Container>
          <div className={css.form}>
            <h1 className={css.title}>Давайте познаймимось ближче</h1>
            <EditProfileClient />
          </div>
        </Container>
        <Image
          className={css.image}
          src={"/sign-up-add.jpg"}
          alt="Tree"
          width={720}
          height={900}
        />
      </div>
    </Section>
  );
}
