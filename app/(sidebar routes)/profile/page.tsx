import Container from "@/components/Container/Container";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/ProfileEditForm/ProfileEditForm";
import Section from "@/components/Section/Section";
import { getServerMe } from "@/lib/api/serverApi";
import css from "./ProfilePage.module.css";

const ProfilePage = async () => {
  const user = await getServerMe();

  return (
    <Section>
      <Container>
        <div className={css.wrapper}>
          <ProfileAvatar userServer={user} />
          <ProfileEditForm userServer={user} />
        </div>
      </Container>
    </Section>
  );
};

export default ProfilePage;
