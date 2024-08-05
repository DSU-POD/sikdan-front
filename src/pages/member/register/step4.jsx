import RegisterStep4Component from "@/components/register-step4";

export default function RegisterStep4() {
  return (
    <>
      <RegisterStep4Component />
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
