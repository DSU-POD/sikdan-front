import axios from 'axios';
import { FeedComponent } from "@/components/feed-component";
import { Avatar } from '@radix-ui/react-avatar';
import { current } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { api } from '@/modules/api.module';

export default function Feed({ posts }) {
  const [feedList, setFeedList] = useState([]);

  const getFeedList = async () => {
    try {
      let page = 1;
      let type = 'expert';
      const response = await api.get(`/feed/list/${page}?type=${type}`);
      const posts = response.data;
      return response;
     
    } catch (error) {
      console.error('Error fetching posts:', error.message);
      
    } 
  } 
  useEffect(() => {
    getFeedList().then(result => {
      if (result) {
        setFeedList(result.data);
      }
    });
  }, []);
  return (
    <>
      <FeedComponent posts={feedList} />
    </>
  );
}

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