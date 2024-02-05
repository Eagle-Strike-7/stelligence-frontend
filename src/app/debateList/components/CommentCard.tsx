import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineEdit, AiTwotoneAlert } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';

export interface DebateCommentProps {
  userImg: string;
  userName: string;
  commentContent: string;
  time: string;
}

const CommentCard: React.FC<DebateCommentProps> = ({
  userImg,
  userName,
  commentContent,
  time,
}) => {
  return (
    <Box className="flex w-full p-4 rounded-md  bg-blue-100  my-2">
      {/*  SECTION - 유저 정보 부분 */}
      <Box className="flex flex-col justify-center items-center justify-items-center align-middle w-16 mr-4">
        <Avatar src={userImg} size="sm" />
      </Box>

      {/* SECTION - 나머지 컨텐츠 부분  */}
      <Box className="flex-col w-full">
        {/* SECTION - 가장 위 수정/삭제 아이콘 영역 */}
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
            />
            <AiOutlineEdit size="1.25rem " className="hover:cursor-pointer" />
          </Box>
        </Box>
        {/* SECTION - 댓글 영역 */}
        <Box>
          <Text>{commentContent}</Text>
        </Box>
        {/* SECTION - 배지 및 작성 시간 영역 */}
        <Box className="flex justify-end items-baseline">
          <Text className="text-gray-600 text-xs">{time}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentCard;
