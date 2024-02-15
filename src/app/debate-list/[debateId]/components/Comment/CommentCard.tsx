import ReportModal from '@/components/Common/ReportModal';
import renderContentWithTags from '@/lib/debate/renderContentWithTags';
import { deleteComment, updateComment } from '@/service/debate/comment';

import {
  Avatar,
  Box,
  Button,
  Tag,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
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
  commentIds: number[];
  setIsChanged: Dispatch<SetStateAction<boolean>>;
  handleClickCommentId: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const CommentCard: React.FC<DebateCommentProps> = ({
  userImg,
  userName,
  commentContent,
  time,
  commentId,
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
        <div className="flex flex-col w-full my-2">
          <Textarea
            className="w-full flex-shrink-0"
            bg="#212121"
            border="none"
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
            bg="primary.500"
            onClick={handleUpdateComment}
            _hover={{ bg: 'primary.600' }}
          >
            수정완료
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center w-12 mr-4 ">
            <Avatar src={userImg} size="sm" />
          </div>
          <div className="flex-col w-full">
            <div className="flex justify-between text-white place-items-end">
              <div className="flex place-items-end">
                <Tag
                  mr={2}
                  cursor="pointer"
                  verticalAlign="middle"
                  fontSize="xs"
                  lineHeight="max"
                  bg="primary.900"
                  color="primary.300"
                  fontWeight={700}
                  size="sm"
                  onClick={handleClickCommentId}
                  id={commentId.toString()}
                >
                  #{commentId}
                </Tag>
                <Text fontSize="sm" color="primary.500">
                  {userName}
                </Text>
              </div>
              <div className="flex justify-center align-center">
                <AiTwotoneAlert
                  size="1.1rem"
                  className="mr-1 hover:cursor-pointer hover:opacity-50"
                  onClick={onOpen}
                />
                <HiOutlineTrash
                  size="1.1rem"
                  className="mr-1 hover:cursor-pointer hover:opacity-50"
                  onClick={handleDeleteComment}
                />
                <AiOutlineEdit
                  size="1.1rem "
                  className="hover:cursor-pointer hover:opacity-50"
                  onClick={handleEditComment}
                />
              </div>
            </div>
            <div className="text-sm my-2">
              <div>{renderContentWithTags(commentContent, commentIds)}</div>
            </div>
            <div className="flex justify-end items-baseline">
              <Text className="text-gray-600 text-xs">
                {time.split('.')[0]}
              </Text>
            </div>
          </div>
        </>
      )}
    </Box>
  );
};

export default CommentCard;
