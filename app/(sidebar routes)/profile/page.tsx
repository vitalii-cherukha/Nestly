import Container from "@/components/Container/Container";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/ProfileEditForm/ProfileEditForm";
import Section from "@/components/Section/Section";
import { getServerMe } from "@/lib/api/serverApi";
import css from "./ProfilePage.module.css";

const ProfilePage = async () => {
  const user = await getServerMe();

  return (
    <div className={css.wrapper}>
      <Section>
        <Container>
          <ProfileAvatar userServer={user} />
          <ProfileEditForm userServer={user} />
        </Container>
      </Section>
    </div>
  );
};

export default ProfilePage;
