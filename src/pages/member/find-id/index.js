import FindIdComponent from "@/components/find-id";

export default function FindId() {
  return <FindIdComponent />;
}

export const getServerSideProps = async () => {
  return {
    props: {
      isBeforeLogin: true,
    },
  };
};
