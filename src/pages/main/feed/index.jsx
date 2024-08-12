import axios from 'axios';
import { FeedComponent } from "@/components/feed-component";
import { Avatar } from '@radix-ui/react-avatar';

export default function Feed({ posts }) {
  return (
    <>
      <FeedComponent posts={posts} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { page = 1 } = context.query; 
  const type = context.query.type ?? 'expert'; 

  const posts = [
    {
      avatar: "",
      username: "Lee Sangho",
      timeAgo: "3분 전",
      image: "",
      caption: "오늘의 식단",
    },
    {
      avatar: "",
      username: "SimSim",
      timeAgo: "1시간 전",
      image: "",
      caption: "퇴근하고 싶다",
    },
    {
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