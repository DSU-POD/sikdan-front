import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { api } from "@/modules/api.module";
import { showToast } from "./layout/toast";

export default function LikeComponent({ likeYn, count, feedId }) {
  const [likeNum, setLikeNum] = useState(0);
  const [isLike, setIsLike] = useState(false);

  const isError = true;

  const handleLike = async () => {
    const response = await api.post(`/feed/like`, {
      feedId,
    });
    if (response.result === "success") {
      setIsLike(true);
      setLikeNum((current) => current + 1);
    } else {
      showToast("좋아요 처리 도중 오류가 발생하였습니다.", isError);
    }
  };

  const handleLikeCancel = async () => {
    const response = await api.delete(`/feed/likeCancel`, {
      data: {
        feedId,
      },
    });
    if (response.result === "success") {
      setIsLike(false);
      setLikeNum((current) => current - 1);
    } else {
      showToast("좋아요 처리 도중 오류가 발생하였습니다.", isError);
    }
  };

  useEffect(() => {
    setLikeNum(count);
    setIsLike(likeYn);
  }, [count, likeYn]);

  return (
    <Button
      className="flex items-center gap-2"
      variant="ghost"
      size="icon"
      onClick={() => {
        isLike ? handleLikeCancel() : handleLike();
      }}
    >
      {isLike ? <HeartFilledIcon /> : <HeartIcon />}
      <span>{likeNum}</span>
    </Button>
  );
}
