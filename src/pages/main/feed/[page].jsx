import { FeedComponent } from "@/components/feed-component";

export default function Feed({ page, type }) {
  return (
    <>
      <FeedComponent page={page} type={type} />
    </>
  );
}

export const getServerSideProps = (context) => {
  const { page } = context.query;
  const type = context.query.type ?? "expert";

  return {
    props: {
      page,
      type,
    },
  };
};
/*
export async function getServerSideProps(context) {
  const { page = 1 } = context.query; 
  const type = context.query.type ?? 'expert'; 
  const posts = [
    {
      id: 1,
      avatar: "",
      username: "Lee Sangho",
      timeAgo: "3분 전",
      image: "",
      caption: "오늘의 식단",
    },
    {
      id: 2,
      avatar: "",
      username: "SimSim",
      timeAgo: "1시간 전",
      image: "",
      caption: "퇴근하고 싶다",
    },
    {
      id: 3,
      avatar: "",
      username: "JEJU",
      timeAgo: "1일 전",
      image: "",
      caption: "제주 금귤",
    },
  ];

  return {
    props: {
      posts,
    },
  };
}
  */

/*
  try {
    const response = await axios.get(`http://3.34.53.152:3001/feed/list/${page}?type=${type}`);
    const posts = response.data;

    return {
      props: {
        posts,
        currentPage: parseInt(page, 15),
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    return {
      props: {
        posts: [],
        currentPage: parseInt(page, 15),
      },
    }; 
  } 
} 
*/
