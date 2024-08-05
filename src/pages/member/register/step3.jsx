import RegisterStep3Component from "@/components/register-step3";

export default function RegisterStep3() {
  return (
    <>
      <RegisterStep3Component />
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
