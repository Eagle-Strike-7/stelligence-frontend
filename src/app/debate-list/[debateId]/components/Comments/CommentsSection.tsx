import React, { forwardRef, useEffect, useState } from 'react';
import { getCommentList } from '@/service/debate/comment';
import { CommentProps } from '@/types/debate/comment';
import CommentsHeader from './CommentsHeader';
import CommentCard from './CommentCard';

interface CommentsSectionProps {
  debateId: number;
  commentIds: number[];
  commentsUpdated: boolean;
  handleClickCommentId: (e: React.MouseEvent<HTMLSpanElement>) => void;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  selectedCommentId: string;
}

const CommentsSection = forwardRef<HTMLDivElement, CommentsSectionProps>(
  (
    {
      debateId,
      commentIds,
      commentsUpdated,
      handleClickCommentId,
      selectedOption,
      setSelectedOption,
      selectedCommentId,
    },
    ref,
  ) => {
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
      <div ref={ref} className="flex flex-col gap-4 rounded-lg mb-16">
        <CommentsHeader
          commentsNum={commentList.length}
          setSelectedOption={setSelectedOption}
        />
        <div className="flex flex-col">
          {(selectedOption === '최신순'
            ? [...commentList].reverse()
            : commentList
          ).map((comment: CommentProps) => {
            return (
              <CommentCard
                id={`comment-#${comment.sequence}`}
                key={comment.commentId}
                commentorId={comment.commenter.memberId}
                userImg={comment.commenter.profileImgUrl}
                userName={comment.commenter.nickname}
                commentId={comment.commentId}
                commentContent={comment.content}
                time={comment.createdAt.replace('T', ' ')}
                commentIds={commentIds}
                sequence={comment.sequence.toString()}
                setIsChanged={setIsChanged}
                handleClickCommentId={handleClickCommentId}
                selectedCommentId={selectedCommentId}
              />
            );
          })}
        </div>
      </div>
    );
  },
);

CommentsSection.displayName = 'CommentsSection';

export default CommentsSection;
