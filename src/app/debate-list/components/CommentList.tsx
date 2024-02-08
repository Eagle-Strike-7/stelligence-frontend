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

  useEffect(() => {
    getCommentList(debateId)
      .then(comments => {
        setCommentList([...comments]);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [debateId, commentsUpdated]);

  return (
    <div className="flex flex-col w-full mb-20 ">
      <span className="w-32 text-lg font-bold mt-3 flex-shrink-0">
        작성된 댓글({commentList.length})
      </span>
      {commentList.map((comment: CommentProps) => {
        return (
          <Comment
            key={comment.commentId}
            userImg={comment.commenter.profileImgUrl}
            userName={comment.commenter.nickname}
            commentContent={comment.content}
            time={comment.createdAt.replace('T', ' ')}
          />
        );
      })}
    </div>
  );
};

export default CommentList;
