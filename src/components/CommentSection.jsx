import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CommentSection({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center p-4">
      <div className="bg-white dark:bg-gray-950 rounded-t-2xl w-full max-w-md shadow-lg">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <div className="font-medium">shadcn</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                3h ago
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            &times;
          </button>
        </div>
        <div className="p-4 space-y-4">
          {/* 댓글 내용 */}
          <div className="flex items-start gap-3">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-medium flex flex-row items-center gap-4">
                <span>shuding_</span>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  1h
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                Great post!
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <ReplyIcon className="w-4 h-4" />
                  <span className="sr-only">Reply</span>
                </Button>
              </div>
            </div>
          </div>
          {/* 댓글 입력 섹션 */}
          <div className="flex items-center gap-2 border-t border-gray-200 dark:border-gray-800 pt-4">
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="댓글을 입력해주세요."
              className="flex-1 resize-none border-0 focus:ring-0 dark:bg-gray-950 dark:text-gray-50"
            />
            <Button variant="ghost" size="icon">
              <SendIcon className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReplyIcon(props) {
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
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
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