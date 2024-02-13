import React, { useEffect, useRef, useState } from 'react';
import { postNewComment } from '@/service/debate/comment';
import scrollToBottom from '@/lib/debate/scrollToBottom';
import { Button, Textarea } from '@chakra-ui/react';
import {
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleUp,
} from 'react-icons/hi';
import CommentDropdownMenu from './CommentDropdownMenu';

interface CommentCreateProps {
  onCommentCreated: () => void;
  debateId: number;
  commentIds: number[];
  debateStatus: 'OPEN' | 'CLOSED' | null;
  handleClickCommentId: (e: any) => void;
  selectedCommentId: string;
}
const CommentCreate = ({
  onCommentCreated,
  debateId,
  debateStatus,
  selectedCommentId,
  handleClickCommentId,
  commentIds,
}: CommentCreateProps) => {
  const textareaRef = useRef(null);
  const [isCreateCommentOpen, setIsCommentCreateOpen] = useState<boolean>(true);
  const [newContent, setNewContent] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (selectedCommentId) {
      const lastInputValue = newContent.charAt(newContent.length - 1);
      if (lastInputValue === '#') {
        setNewContent(prevContent => {
          return `${prevContent + selectedCommentId} `;
        });
      } else {
        const additionalSpace =
          newContent && !newContent.endsWith(' ') ? ' ' : '';
        setNewContent(prevContent => {
          return `${prevContent}${additionalSpace}#${selectedCommentId} `;
        });
      }
    }
  }, [selectedCommentId]); // newContent를 의존성 배열에서 제거

  // NOTE 커서 위치 기반으로 드롭다운 위치 계산하는 함수
  const calculateDropdownPosition = (textarea: HTMLTextAreaElement) => {
    const text = textarea.value;
    const cursorIndex = textarea.selectionStart;
    const lineNumber = text.substr(0, cursorIndex).split('\n').length;
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
    const currentLineText = text.substr(0, cursorIndex).split('\n').pop();
    const charWidth = parseInt(getComputedStyle(textarea).fontSize, 10) * 0.6;
    const additionalLeftOffset = 15;
    const approximateLeft = currentLineText
      ? currentLineText.length * charWidth + additionalLeftOffset
      : 10;
    const additionalOffset = 30;
    const approximateTop =
      (lineNumber - 1) * lineHeight + textarea.offsetTop + additionalOffset;

    setCursorPosition({ top: approximateTop, left: approximateLeft });
  };

  // NOTE textarea값 바뀔 때마다 호출되는 함수
  const handleChangeInput = (e: any) => {
    const textarea = e.target;
    setNewContent(textarea.value);

    // '#'이 포함되어 있는지 확인하고 드롭다운 표시 여부 결정
    const hasHashOrHashAndNumber = /#$|#\d+$/.test(textarea.value);
    if (hasHashOrHashAndNumber) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
    calculateDropdownPosition(textarea);
  };

  // NOTE 드롭다운 후보 댓글 클릭 시 동작하는 함수
  const handleClickDropdownComment = (e: React.MouseEvent<HTMLSpanElement>) => {
    handleClickCommentId(e);
    setShowDropdown(false);
  };

  // NOTE 댓글 작성 제출 함수
  const handleSubmitComment = () => {
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
            <div className="relative inline-block">
              <span className="text-xl font-bold flex-shrink-0 pb-2">댓글</span>
            </div>

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
            ref={textareaRef}
            className="w-full my-3 flex-shrink-0"
            bg="#292929"
            marginBottom={8}
            border="none"
            placeholder="댓글을 여기에 입력해주세요 :)"
            value={newContent}
            onChange={handleChangeInput}
            onClick={handleChangeInput} // 커서 이동 시에도 위치 업데이트
            style={{ lineHeight: '20px' }}
          />

          {newContent.length > 0 && showDropdown && (
            <div
              style={{
                position: 'absolute',
                top: `${cursorPosition.top}px`,
                left: `${cursorPosition.left}px`,
                backgroundColor: 'white',
              }}
            >
              {commentIds.length > 0 && (
                <CommentDropdownMenu
                  items={commentIds}
                  handleClickDropdownComment={handleClickDropdownComment}
                />
              )}
            </div>
          )}

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
            onClick={handleSubmitComment}
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
