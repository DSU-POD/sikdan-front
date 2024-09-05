import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { api } from "@/modules/api.module";
import { useState } from "react";

export default function CommentWriteComponent({ feedId, refetchList }) {
  const { nickname, userId } = useSelector(
    (state) => state.memberReducer.loginData
  );

  const [contents, setContents] = useState("");

  const handleCommentWrite = async () => {
    const response = await api.post(`/comment/add`, {
      feedId,
      contents,
    });

    if (response.result) {
      refetchList();
    }
  };

  const handleReplyWrite = async () => {};
  return (
    <div className="flex items-start gap-4 rounded-lg bg-card">
      <div className="flex-1">
        <div className="mb-2 font-medium">@{userId}</div>
        <div className="relative">
          <Textarea
            placeholder="댓글을 입력해주세요"
            className="w-full resize-none rounded-lg border border-muted px-4 py-2 pr-12 text-sm"
            rows={1}
            onChange={(e) => setContents(e.currentTarget?.value)}
            value={contents}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute top-1/2 right-3 -translate-y-1/2"
            onClick={() => handleCommentWrite()}
          >
            <SendIcon className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function SendIcon(props) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
