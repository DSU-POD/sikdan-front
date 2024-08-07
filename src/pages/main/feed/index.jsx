import axios from 'axios';
import { FeedComponent } from "@/components/feed-component";

export default function Feed({ posts }) {
  return (
    <>
      <FeedComponent posts={posts} />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await axios.get('http://3.34.53.152:3001');
    const posts = response.data;

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
}
