import renderContentWithTags from '@/lib/debate/renderContentWithTags';
import { loggedInUserState } from '@/store/user/login';
import { Avatar, Tag } from '@chakra-ui/react';
import { AiTwotoneAlert, AiOutlineEdit } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';
import { useRecoilValue } from 'recoil';

interface CommentDisplayProps {
  id: string;
  userImg: string;
  userName: string;
  commentContent: string;
  time: string;
  commentIds: number[];
  commentorId: number;
  handleClickCommentId: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onOpen: () => void;
  handleDeleteComment: () => void;
  handleEditComment: () => void;
  sequence: string;
}

const CommentDisplay: React.FC<CommentDisplayProps> = ({
  id,
  userImg,
  userName,
  commentContent,
  time,
  commentIds,
  commentorId,
  sequence,
  handleClickCommentId,
  onOpen,
  handleDeleteComment,
  handleEditComment,
}) => {
  const currentUserInfo = useRecoilValue(loggedInUserState);
  const isEditableUser = currentUserInfo.memberId === commentorId;

  return (
    <>
      <div
        className="flex flex-col justify-center items-center w-12 mr-4 "
        id={id}
      >
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
              id={sequence.toString()}
            >
              #{sequence}
            </Tag>
            <p className="text-sm text-primary-dark-500 break-all">
              {userName}
            </p>
          </div>
          <div className="flex justify-center align-center">
            <AiTwotoneAlert
              size="1.1rem"
              className="mr-1 hover:cursor-pointer hover:opacity-50"
              onClick={onOpen}
            />
            {isEditableUser && (
              <>
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
              </>
            )}
          </div>
        </div>
        <div className="text-sm my-2 break-all ">
          <p className="leading-[1.5rem] align-middle">
            {renderContentWithTags(commentContent, commentIds)}
          </p>
        </div>
        <div className="flex justify-end items-baseline break-all">
          <p className="text-gray-600 text-xs">{time.split('.')[0]}</p>
        </div>
      </div>
    </>
  );
};

export default CommentDisplay;
