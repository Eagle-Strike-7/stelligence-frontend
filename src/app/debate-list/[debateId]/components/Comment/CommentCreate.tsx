import React, { useState } from 'react';
import { postNewComment } from '@/service/debate/comment';
import scrollToBottom from '@/lib/debate/scrollToBottom';
import { Button, Textarea } from '@chakra-ui/react';
import {
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleUp,
} from 'react-icons/hi';

interface CommentCreateProps {
  onCommentCreated: () => void;
  debateId: number;
  debateStatus: 'OPEN' | 'CLOSED' | null;
}
const CommentCreate = ({
  onCommentCreated,
  debateId,
  debateStatus,
}: CommentCreateProps) => {
  const [isCreateCommentOpen, setIsCommentCreateOpen] = useState<boolean>(true);
  const [newContent, setNewContent] = useState<string>('');

  const submitComment = () => {
    postNewComment(newContent, debateId)
      .then(() => {
        onCommentCreated();
        setNewContent('');
        scrollToBottom();
      })
      .catch(error => {
        console.error('Error creating comment:', error);
      });
  };

  // NOTE 중첩 삼항연산자를 피하기 위해 renderCreateCommentBox 함수 별도로 설정
  // TODO 별도의 컴포넌트로 리팩토링
  const renderCreateCommentBox = () => {
    if (debateStatus !== 'OPEN') {
      return (
        <div className="flex justify-center pt-3 z-10 place-items-baseline">
          <span className="text-xl font-bold flex-shrink-0 mr-4">
            종료된 토론입니다.
          </span>
        </div>
      );
    }

    if (isCreateCommentOpen) {
      return (
        <>
          <div className="flex flex-row justify-between align-center w-full mt-3">
            <span className="text-xl font-bold flex-shrink-0 pb-2">댓글</span>
            <HiOutlineChevronDoubleDown
              size={20}
              onClick={() => {
                return setIsCommentCreateOpen(false);
              }}
              className="hover:cursor-pointer"
              color="primary.500"
            />
          </div>
          <Textarea
            className="w-full my-3 flex-shrink-0"
            bg="#292929"
            marginBottom={8}
            border="none"
            placeholder="댓글을 여기에 입력해주세요 :)"
            value={newContent}
            onChange={e => {
              return setNewContent(e.target.value);
            }}
          />
          <Button
            className="w-20 self-end"
            size="sm"
            bg="primary.500"
            color="text.light"
            marginBottom={6}
            _hover={{
              bg: 'rgba(118, 147, 231, 0.7)', // 'primary.500'에 해당하는 RGBA 값
              color: 'white',
              transition: 'background-color 0.5s ease',
            }}
            _active={{
              bg: 'rgba(118, 147, 231, 0.5)',
              transition: 'background-color 0.2s ease',
            }}
            _focus={{
              boxShadow:
                '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            }}
            onClick={submitComment}
          >
            댓글달기
          </Button>
        </>
      );
    }

    return (
      <div className="flex justify-between pt-3 z-10">
        <span className="text-xl font-bold flex-shrink-0 pb-2">댓글</span>
        <HiOutlineChevronDoubleUp
          className="hover:cursor-pointer"
          size={20}
          onClick={() => {
            return setIsCommentCreateOpen(true);
          }}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col w-[70rem] fixed bottom-0 pt-2 pb-6 px-6 mx-auto border-2 text-white border-primary-dark-500/10 shadow-lg rounded-md bg-background-dark">
      {renderCreateCommentBox()}
    </div>
  );
};

export default CommentCreate;
