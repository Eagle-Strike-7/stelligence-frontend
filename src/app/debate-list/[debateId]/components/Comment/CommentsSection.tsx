import React, { useEffect, useState } from 'react';
import { getCommentList } from '@/service/debate/comment';
import { CommentProps } from '@/types/debate/comment';
import ChakraSelect from '@/components/Common/ChakraSelect';
import Comment from './CommentCard';

interface CommentsSectionProps {
  debateId: number;
  commentIds: number[];
  commentsUpdated: boolean;
  handleClickCommentId: (e: React.MouseEvent<HTMLSpanElement>) => void;
}
const CommentsSection: React.FC<CommentsSectionProps> = ({
  debateId,
  commentIds,
  commentsUpdated,
  handleClickCommentId,
}) => {
  const [commentList, setCommentList] = useState<CommentProps[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('등록순');

  const commentSelectOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'oldest', label: '등록순' },
  ];

  useEffect(() => {
    getCommentList(debateId)
      .then(comments => {
        if (selectedOption === '최신순') {
          setCommentList([...comments].reverse());
        } else {
          setCommentList([...comments]);
        }
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [debateId, commentsUpdated, isChanged]);

  return (
    <div className="flex flex-col gap-6 mb-5  rounded-lg ">
      <div className="flex flex-col w-full mb-10 ">
        <div className="flex justify-between place-items-center my-3">
          <div className="flex justify-left place-items-end">
            <span className="text-2xl font-bold text-white">토론 현황</span>
            <span className="text-white ml-2">(총 {commentList.length}개)</span>
          </div>
          <ChakraSelect
            options={commentSelectOptions}
            setSelectedOption={setSelectedOption}
          />
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
              commentIds={commentIds}
              setIsChanged={setIsChanged}
              handleClickCommentId={handleClickCommentId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentsSection;
