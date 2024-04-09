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
  debateStatus: 'OPEN' | 'CLOSED' | null;
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
      debateStatus,
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
          throw new Error('댓글 데이터 가져오기 오류:', error);
        });
    }, [debateId, commentsUpdated, isChanged]);

    return (
      <div ref={ref} className="flex flex-col gap-4 rounded-lg mb-16">
        <CommentsHeader
          commentsNum={commentList.length}
          setSelectedOption={setSelectedOption}
        />
        {commentList.length !== 0 ? (
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
        ) : (
          <div className="text-white flex justify-center h-20 w-full align-middle py-6 my-2 rounded-md bg-primary-dark-500/10 ">
            {debateStatus === 'OPEN'
              ? '작성된 댓글이 없습니다! 토론에 참여해보세요 💬'
              : '작성된 댓글이 없습니다.'}
          </div>
        )}
      </div>
    );
  },
);

CommentsSection.displayName = 'CommentsSection';

export default CommentsSection;
