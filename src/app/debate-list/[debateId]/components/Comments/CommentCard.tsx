import React, { Dispatch, SetStateAction, useState } from 'react';
import { usePathname } from 'next/navigation';
import ReportModal from '@/components/Common/ReportModal';
import { deleteComment, updateComment } from '@/service/debate/comment';
import { Box, useDisclosure } from '@chakra-ui/react';
import EditCommentForm from './CreateComment/EditCommentForm';
import CommentDisplay from './CreateComment/CommentDisplay';

export interface DebateCommentProps {
  userImg: string;
  userName: string;
  commentContent: string;
  time: string;
  commentId: number;
  commentIds: number[];
  commentorId: number;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
  handleClickCommentId: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const CommentCard: React.FC<DebateCommentProps> = ({
  userImg,
  userName,
  commentContent,
  time,
  commentId,
  commentorId,
  commentIds,
  setIsChanged,
  handleClickCommentId,
}) => {
  const pathname = usePathname();
  const debateId = Number(pathname.split('/').pop());
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updatedComment, setUpdatedComment] = useState<string>(commentContent);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteComment = () => {
    deleteComment(commentId, debateId);
    setIsChanged(prev => {
      return !prev;
    });
  };
  const handleEditComment = () => {
    setIsEdit(prev => {
      return !prev;
    });
  };

  const handleUpdateComment = () => {
    updateComment(commentId, updatedComment, debateId);
    setIsChanged(prev => {
      return !prev;
    });
    setIsEdit(prev => {
      return !prev;
    });
  };

  return (
    <Box className="flex w-full py-4 px-3 my-2 rounded-md bg-primary-dark-500/10 text-white">
      <ReportModal
        isOpen={isOpen}
        onClose={onClose}
        title="comment"
        dataId={commentId}
      />
      {isEdit ? (
        <EditCommentForm
          updatedComment={updatedComment}
          setUpdatedComment={setUpdatedComment}
          handleUpdateComment={handleUpdateComment}
        />
      ) : (
        <CommentDisplay
          userImg={userImg}
          userName={userName}
          commentContent={commentContent}
          time={time}
          commentId={commentId}
          commentIds={commentIds}
          commentorId={commentorId}
          handleClickCommentId={handleClickCommentId}
          onOpen={onOpen}
          handleDeleteComment={handleDeleteComment}
          handleEditComment={handleEditComment}
        />
      )}
    </Box>
  );
};

export default CommentCard;
