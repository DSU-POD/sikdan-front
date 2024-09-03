import { FeedViewComponent } from "@/components/feed-view-component";

export default function FeedView({ id }) {
  return <FeedViewComponent id={id} />;
}

export const getServerSideProps = (context) => {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
};
