import { ProfileComponent } from "@/components/profile-component";

export default function ProfilePage() {
  return (
    <>
      <ProfileComponent />
    </>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {
      isBeforeLogin: true,
    },
  };
};