import { deleteComment, updateComment } from '@/service/debate/comment';
import { Avatar, Box, Button, Text, Textarea } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { AiOutlineEdit, AiTwotoneAlert } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';

export interface DebateCommentProps {
  userImg: string;
  userName: string;
  commentContent: string;
  time: string;
  commentId: number;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

const CommentCard: React.FC<DebateCommentProps> = ({
  userImg,
  userName,
  commentContent,
  time,
  commentId,
  setIsChanged,
}) => {
  const pathname = usePathname();
  const debateId = Number(pathname.split('/').pop());
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updatedComment, setUpdatedComment] = useState<string>(commentContent);

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
    <Box className="flex w-full p-4 my-3 rounded-md bg-primary-dark/10 text-white">
      {isEdit ? (
        <div className="flex flex-col w-full my-2">
          <Textarea
            className="w-full flex-shrink-0"
            bg="white"
            marginBottom={4}
            placeholder="댓글을 여기에 입력해주세요 :)"
            value={updatedComment}
            onChange={e => {
              setUpdatedComment(e.target.value);
            }}
          />
          <Button
            className="w-20 self-end"
            size="sm"
            bg="accent.500"
            color="white"
            onClick={handleUpdateComment}
          >
            수정완료
          </Button>
        </div>
      ) : (
        <>
          <Box className="flex flex-col justify-center items-center justify-items-center align-middle w-16 mr-4">
            <Avatar src={userImg} size="sm" />
          </Box>
          <Box className="flex-col w-full">
            <Box className="flex justify-between text-white ">
              <Text fontSize="xs" className="text-primary">
                {userName}
              </Text>
              <Box className="flex justify-center align-center">
                <AiTwotoneAlert
                  size="1.25rem"
                  className="mr-1 hover:cursor-pointer"
                />
                <HiOutlineTrash
                  size="1.25rem"
                  className="mr-1 hover:cursor-pointer"
                  onClick={handleDeleteComment}
                />
                <AiOutlineEdit
                  size="1.25rem "
                  className="hover:cursor-pointer"
                  onClick={handleEditComment}
                />
              </Box>
            </Box>
            <Box>
              <Text>{commentContent}</Text>
            </Box>
            <Box className="flex justify-end items-baseline">
              <Text className="text-gray-600 text-xs">
                {time.split('.')[0]}
              </Text>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CommentCard;
