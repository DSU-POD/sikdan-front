import { LoginComponent } from "@/components/login";

export default function Login() {
  return (
    <>
      <LoginComponent />
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
