import FindPasswordComponent from "@/components/find-password";

export default function FindPassword() {
  return <FindPasswordComponent />;
}

export const getServerSideProps = async () => {
  return {
    props: {
      isBeforeLogin: true,
    },
  };
};
