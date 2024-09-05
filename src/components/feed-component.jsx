// feed-component.jsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import CommentSetion from "@/components/CommentSection";
import { useSelector } from "react-redux";
import { api } from "@/modules/api.module";
import { showToast } from "./layout/toast";

// FeedComponent
export function FeedComponent({ page: pageNum, type }) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [feedList, setFeedList] = useState([]);
  const [page, setPage] = useState(pageNum);
  const { userId } = useSelector((state) => state.memberReducer.loginData);

  useEffect(() => {
    setPage(pageNum);
  }, []);

  useEffect(() => {
    getFeedList().then((result) => {
      if (result) {
        setFeedList(result.data);
      }
    });
  }, []);

  const getFeedList = async () => {
    try {
      const response = await api.get(`/feed/list/${page}?type=${type}`);
      return response;
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };
  const handleLike = async (index, feedId) => {
    try {
      const response = await api.post("/feed/like", {
        feedId,
        userId, // 로그인된 사용자의 ID 전달
      });
      if (response.result === "success") {
        setFeedList((feedList) => {
          const update = [...feedList];
          update[index].isLike = true;
          return update;
        });
      }
    } catch (error) {
      showToast("오류가 발생하였습니다.", true);
    }
  };

  const handleLikeCancel = async (index, feedId) => {
    try {
      // db -> like -> db insert
      // like cancel -> db delete
      const response = await api.delete("/feed/likeCancel", {
        data: {
          feedId,
          userId,
        },
      });
      if (response.result === "success") {
        setFeedList((feedList) => {
          const update = [...feedList];
          update[index].isLike = false;
          return update;
        });
      }
    } catch (error) {
      showToast("오류가 발생하였습니다.", true);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {feedList.map((feed, index) => (
            <Card key={index} className="rounded-lg overflow-hidden">
              <CardHeader className="flex items-start gap-3 p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage src={feed.avatar} />
                    <AvatarFallback>
                      {feed.memberFeed?.nickname.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5">
                    <Link href="#" className="font-medium" prefetch={false}>
                      <div className="text-gray-500 dark:text-gray-400 text-sm">
                        @{feed.memberFeed?.userId}
                      </div>
                    </Link>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      {feed.timeAgo}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <img
                  src={feed.feedDiet?.url}
                  width={600}
                  height={600}
                  alt="Post"
                  className="aspect-square object-cover"
                />
              </CardContent>
              <CardFooter className="p-4 grid gap-3">
                <div className="flex items-center gap-1">
                  <button
                    className={`flex items-center justify-center bg-transparent border-none cursor-pointer p-2 rounded-full transition-transform duration-200 ease-in-out ${
                      feed.isLike ? "scale-110" : ""
                    }`}
                    aria-label="Like"
                    onClick={() =>
                      feed.isLike
                        ? handleLikeCancel(index, feed.id)
                        : handleLike(index, feed.id)
                    }
                  >
                    <svg
                      className="heart-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={feed.isLike ? "#72a555" : "none"}
                      stroke={feed.isLike ? "#72a555" : "#606770"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCommentOpen(true)}
                  >
                    <MessageCircleIcon className="w-5 h-5" />
                    <span className="sr-only">Comment</span>
                  </Button>
                </div>
                <div className="space-y-2">
                  <div>
                    <Link href="#" className="font-medium" prefetch={false}>
                      {feed.username}
                    </Link>
                    {feed.caption}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">
                    View all {feed.commentsCount} comments
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <CommentSetion
        isOpen={isCommentOpen}
        onClose={() => setIsCommentOpen(false)}
      />
    </div>
  );
}

// LikeButton 컴포넌트
function LikeButton({ isLike }) {
  return (
    <>
      <button
        className={`flex items-center justify-center bg-transparent border-none cursor-pointer p-2 rounded-full transition-transform duration-200 ease-in-out ${
          isLike ? "scale-110" : ""
        }`}
        aria-label="Like"
      >
        <HeartIcon isLike={isLike} />
      </button>
    </>
  );
}

// HeartIcon 컴포넌트
function HeartIcon({ isLike }) {
  return (
    <svg
      className="heart-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={isLike ? "#72a555" : "none"}
      stroke={isLike ? "#72a555" : "#606770"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  );
}

// MessageCircleIcon 컴포넌트
function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
/*
function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}
*/

/* function ThumbsUpIcon(props) {
  return (
    <svg
      className="thumbs-up-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
       fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
} 

function BookmarkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
} 


function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
} 

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
} */

/*
function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
 */

/*
function SquarePlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
} */

/*
function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
} */
