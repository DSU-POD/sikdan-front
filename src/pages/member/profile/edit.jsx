import ProfileEditComponent from "@/components/profile-edit";

export default function ProfileEdit() {
  return <ProfileEditComponent />;
}

export const getServerSideProps = async () => {
  return {
    props: {
      isBeforeLogin: true,
    },
  };
};
