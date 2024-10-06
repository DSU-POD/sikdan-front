import { FeedEditComponent } from "@/components/feed-edit-component";

export default function FeedEdit({ id }) {
  return <FeedEditComponent id={id} />;
}

export const getServerSideProps = (context) => {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
};
