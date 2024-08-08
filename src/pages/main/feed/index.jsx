import axios from 'axios';
import { FeedComponent } from "@/components/feed-component";

export default function Feed({ posts }) {
  return (
    <>
      <FeedComponent posts={posts} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { page = 1 } = context.query; 
  const type = context.query.type || 'expert'; 

  try {
    const response = await axios.get(`http://3.34.53.152:3001/feed/list/${page}?type=${type}`);
    const posts = response.data;

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    return {
      props: {
        posts: [],
      },
    };
  }
}