import { FeedComponent } from "@/components/feed-component";

export default function Feed({ type }) {
  return (
    <>
      <FeedComponent page={1} type={type} />
    </>
  );
}

export const getServerSideProps = (context) => {
  const type = context.query.type ?? "expert";

  return {
    props: {
      type,
    },
  };
};
