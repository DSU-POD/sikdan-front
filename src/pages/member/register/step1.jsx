import RegisterStep1Component from "@/components/register-step1";

export default function RegisterStep1() {
  return (
    <>
      <RegisterStep1Component />
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
