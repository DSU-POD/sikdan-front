import { FeedComponent } from "@/components/feed-component";

export default function Feed({ posts }) {
  return (
    <>
      <FeedComponent posts={posts} />
    </>
  );
}
