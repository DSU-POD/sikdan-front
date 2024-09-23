import { FeedComponent } from "@/components/feed-component";

export default function Feed({ page, type }) {
  return (
    <>
      <FeedComponent page={page} type={type} />
    </>
  );
}

export const getServerSideProps = (context) => {
  const page =
    context.query.page === 0 || !context.query.page ? 1 : context.query.page;

  const type = context.query.type ?? "expert";

  return {
    props: {
      page,
      type,
    },
  };
};
