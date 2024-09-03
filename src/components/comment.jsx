import { useEffect, useState } from "react";
import CommentWriteComponent from "./comment-write";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { api } from "@/modules/api.module";
import moment from "moment/moment";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export default function CommentComponent({ commentList: list, feedId }) {
  const [commentList, setCommentList] = useState([]);
  const [editData, setEditData] = useState({
    isEdit: true,
    commentId: "",
    contents: "",
  });

  const refetchList = async () => {
    const response = await api.get(`/comment/${feedId}`);

    if (response.result === "success") {
      setCommentList(response.data.length > 0 ? response.data : []);
    }
  };
  useEffect(() => {
    setCommentList(list);
  }, [list]);

  const handleCommentEdit = async (commentId) => {
    setEditData((current) => ({}));
  };
  moment.locale("ko");

  return (
    <>
      <div className="space-y-4">
        {commentList.map((comment, key) => {
          return (
            <div key={key} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {comment.memberComment.nickname.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 justify-between">
                  <div className="font-medium flex items-center gap-2">
                    {comment.memberComment.nickname}
                    <div className="text-gray-500 dark:text-gray-400 text-xs">
                      {moment(comment.createdAt).fromNow()}
                    </div>
                  </div>

                  <div>
                    <button onClick={(e) => handleCommentEdit(comment.id)}>
                      <DotsHorizontalIcon />
                    </button>
                  </div>
                </div>
                <p>{comment.contents}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="space-y-4">
        <CommentWriteComponent feedId={feedId} refetchList={refetchList} />
      </div>
    </>
  );
}
