import RegisterStep2Component from "@/components/register-step2";

export default function RegisterStep2() {
  return (
    <>
      <RegisterStep2Component />
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
