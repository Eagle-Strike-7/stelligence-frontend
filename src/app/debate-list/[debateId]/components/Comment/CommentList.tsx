import React, { useEffect, useState } from 'react';
import { getCommentList } from '@/service/debate/comment';
import { CommentProps } from '@/types/debate/comment';
import Comment from './CommentCard';

interface CommentListProps {
  debateId: number;
  commentsUpdated: boolean;
}
const CommentList: React.FC<CommentListProps> = ({
  debateId,
  commentsUpdated,
}) => {
  const [commentList, setCommentList] = useState<CommentProps[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    getCommentList(debateId)
      .then(comments => {
        setCommentList([...comments]);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [debateId, commentsUpdated, isChanged]);

  return (
    <div className="flex flex-col gap-6 mb-5 rounded-lg ">
      <div className="flex flex-col w-full mb-10 ">
        <div className="flex justify-between my-3 place-content-center align-bottom place-items-end">
          <span className="text-2xl font-bold text-white">토론 현황</span>
          <span>총 {commentList.length}개</span>
        </div>

        {commentList.map((comment: CommentProps) => {
          return (
            <Comment
              key={comment.commentId}
              userImg={comment.commenter.profileImgUrl}
              userName={comment.commenter.nickname}
              commentId={comment.commentId}
              commentContent={comment.content}
              time={comment.createdAt.replace('T', ' ')}
              setIsChanged={setIsChanged}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentList;
