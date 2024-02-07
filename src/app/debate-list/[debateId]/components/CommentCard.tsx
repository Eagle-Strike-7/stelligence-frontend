import { deleteComment } from '@/service/debate/comment';
import { Avatar, Box, Text } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react';
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

  const handleDeleteComment = () => {
    deleteComment(commentId, debateId);
    setIsChanged(prev => {return !prev});
  };

  return (
    <Box className="flex w-full p-4 rounded-md  bg-blue-100  my-2">
      <Box className="flex flex-col justify-center items-center justify-items-center align-middle w-16 mr-4">
        <Avatar src={userImg} size="sm" />
      </Box>
      <Box className="flex-col w-full">
        <Box className="flex justify-between text-gray-600 ">
          <Text fontSize="xs">{userName}</Text>
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
            <AiOutlineEdit size="1.25rem " className="hover:cursor-pointer" />
          </Box>
        </Box>
        <Box>
          <Text>{commentContent}</Text>
        </Box>
        <Box className="flex justify-end items-baseline">
          <Text className="text-gray-600 text-xs">{time.split('.')[0]}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentCard;
