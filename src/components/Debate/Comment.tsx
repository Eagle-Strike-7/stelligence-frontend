import { Avatar, Box, Text, Badge } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';

interface DebateCommentProps {
    userImg: string;
    userName: string;
    commentContent: string;
    isWriter: boolean;
    time: string;
}

const Comment: React.FC<DebateCommentProps> = ({
    userImg,
    userName,
    commentContent,
    isWriter,
    time,
}) => {
    return (
        <Box className="flex w-full p-4 rounded-md  bg-gray-100 mx-20 my-4">
            {/*  SECTION - 유저 정보 부분 */}
            <Box className="flex flex-col justify-center items-center justify-items-center align-middle w-24 mr-4">
                <Avatar
                    bg="teal.500"
                    className="w-12 bg-gray-200 overflow-hidden rounded-full"
                    src={userImg}
                />
                <Text>{userName}</Text>
            </Box>

            {/* SECTION - 나머지 컨텐츠 부분  */}
            <Box className="flex-col w-full">
                {/* SECTION - 가장 위 수정/삭제 아이콘 영역 */}
                <Box className="flex justify-end text-gray-600 ">
                    <HiOutlineTrash
                        size="1.5rem"
                        className="mr-1 hover:cursor-pointer"
                    />
                    <AiOutlineEdit
                        size="1.5rem "
                        className="hover:cursor-pointer"
                    />
                </Box>
                {/* SECTION - 댓글 영역 */}
                <Box>
                    <Text>{commentContent}</Text>
                </Box>
                {/* SECTION - 배지 및 작성 시간 영역 */}
                <Box className="flex justify-end items-baseline">
                    {isWriter ? (
                        <Badge
                            variant="subtle"
                            colorScheme="green"
                            className="mr-2 h-full px-1 rounded-md text-sm bg-blue-200"
                        >
                            작성자
                        </Badge>
                    ) : null}
                    <Text className="text-gray-600 ">{time}</Text>
                </Box>
            </Box>
        </Box>
    );
};

export default Comment;
