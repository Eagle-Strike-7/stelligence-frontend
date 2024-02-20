import React, { Dispatch, SetStateAction, useState } from 'react';
import { usePathname } from 'next/navigation';
import ReportModal from '@/components/Common/ReportModal';
import {
  DeleteCommentArgs,
  UpdateCommentArgs,
  deleteComment,
  updateComment,
} from '@/service/debate/comment';
import { Box, useDisclosure, useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EditCommentForm from './CreateComment/EditCommentForm';
import CommentDisplay from './CreateComment/CommentDisplay';

export interface DebateCommentProps {
  id: string;
  userImg: string;
  userName: string;
  commentContent: string;
  time: string;
  commentId: number;
  commentIds: number[];
  commentorId: number;
  sequence: string;
  selectedCommentId: string;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
  handleClickCommentId: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const CommentCard: React.FC<DebateCommentProps> = ({
  id,
  userImg,
  userName,
  commentContent,
  time,
  commentId,
  commentorId,
  commentIds,
  sequence,
  selectedCommentId,
  setIsChanged,
  handleClickCommentId,
}) => {
  const pathname = usePathname();
  const debateId = Number(pathname.split('/').pop());
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updatedComment, setUpdatedComment] = useState<string>(commentContent);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();

  const handleEditComment = () => {
    setIsEdit(prev => {
      return !prev;
    });
  };

  const deleteCommentmutation = useMutation<void, Error, DeleteCommentArgs>({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', commentId] });
      toast({
        title: `댓글 삭제 성공!`,
        description: '댓글 삭제에 성공했습니다!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setIsChanged(prev => {
        return !prev;
      });
    },
    onError: error => {
      console.error('댓글 삭제 실패: ', error);
      toast({
        title: '삭제 실패',
        description: error.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const { mutate: updateCommentMutate } = useMutation<
    void,
    Error,
    UpdateCommentArgs
  >({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', debateId] });
      setIsChanged(prev => {
        return !prev;
      });
      setIsEdit(prev => {
        return !prev;
      });
      toast({
        title: `댓글 수정 성공!`,
        description: '댓글 수정이 완료되었습니다.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    onError: error => {
      console.error('댓글 수정 실패: ', error);
      toast({
        title: '댓글 수정 실패',
        description: error.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    },
  });
  const handleDeleteComment = () => {
    deleteCommentmutation.mutate({ commentId, debateId });
  };

  const handleUpdateComment = () => {
    updateCommentMutate({ commentId, newContent: updatedComment, debateId });
  };

  return (
    <Box className="flex w-full py-4 px-3 my-2 rounded-md bg-primary-dark-500/10 text-white">
      <ReportModal
        isOpen={isOpen}
        onClose={onClose}
        type="comment"
        dataId={commentId}
      />
      {isEdit ? (
        <EditCommentForm
          selectedCommentId={selectedCommentId}
          updatedComment={updatedComment}
          setUpdatedComment={setUpdatedComment}
          handleUpdateComment={handleUpdateComment}
        />
      ) : (
        <CommentDisplay
          id={id}
          userImg={userImg}
          userName={userName}
          commentContent={commentContent}
          time={time}
          sequence={sequence}
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
