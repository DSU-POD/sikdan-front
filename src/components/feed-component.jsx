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
import CommentSection from "@/components/CommentSection";
import { useSelector } from "react-redux";
import { api } from "@/modules/api.module";
import { showToast } from "./layout/toast";
import * as moment from "moment";
import "moment/locale/ko";
import Paginate from "./pagination";
import { useRouter } from "next/router";

export function FeedComponent({ page: pageNum, type }) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [selectedFeedId, setSelectedFeedId] = useState(null); // 선택된 피드의 ID
  const [selectedFeedComments, setSelectedFeedComments] = useState([]); // 선택된 피드의 댓글
  const [feedList, setFeedList] = useState([]); // 전체 피드 리스트
  const [page, setPage] = useState(pageNum);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const { userId } = useSelector((state) => state.memberReducer.loginData);
  moment.locale("ko");

  useEffect(() => {
    setPage(pageNum);
    getFeedList();
  }, [pageNum]);

  useEffect(() => {
    getFeedList().then((result) => {
      if (result) {
        setFeedList(result.data.feedList);
        setTotalCount(result.data.totalCount);
      }
    });
  }, [page]);

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
        userId,
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

  // 댓글 버튼을 눌렀을 때 해당 피드 ID와 댓글 데이터를 설정 및 모달 열기
  const handleCommentOpen = (feedId) => {
    const selectedFeed = feedList.find((feed) => feed.id === feedId); // 피드 찾기
    setSelectedFeedId(feedId); // 선택된 피드 ID 설정
    setSelectedFeedComments(selectedFeed?.feedComment || []); // 해당 피드의 댓글 설정

    setIsCommentOpen(true); // 댓글 모달 열기
  };

  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {feedList.map((feed, index) => (
            <Card
              key={feed.id}
              className="cursor rounded-lg overflow-hidden bg-white shadow-md"
            >
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
                      {moment(feed.createdAt).fromNow()}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent
                className="p-0"
                onClick={() => {
                  const { id } = feed;
                  router.push(`/main/feed/${id}/`);
                }}
              >
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
                    onClick={() => handleCommentOpen(feed.id)} // feed별로 고유한 ID를 사용하여 댓글 열기
                  >
                    <MessageCircleIcon className="w-5 h-5" />
                    <span className="ml-1">{feed.commentNum}</span>
                    <span className="sr-only">Comment</span>
                  </Button>
                </div>
                <div className="text-lg font-semibold">{feed.subject}</div>
                <div
                  className="text-base text-gray-800 dark:text-gray-200"
                  onClick={() => router.push(`/main/feed/${feed.id}/`)}
                >
                  {feed.contents}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Paginate
          totalCount={totalCount}
          type={type}
          page={page}
          onPageChange={(page) => {
            setPage(page);
            router.push(`/main/feed/?page=${page}&type=${type}`);
          }}
        />
      </main>
      {/* 선택된 피드의 댓글을 CommentSection에 전달 */}
      {isCommentOpen ? (
        <CommentSection
          isOpen={isCommentOpen}
          onClose={() => setIsCommentOpen(false)}
          comments={selectedFeedComments} // 선택된 피드의 댓글 전달
        />
      ) : (
        ""
      )}
    </div>
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
