import { Button, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleUp,
} from 'react-icons/hi';

const CreateComment = () => {
  const [isCreateCommentOpen, setIsCommentCreateOpen] = useState<boolean>(true);

  return (
    <div>
      {isCreateCommentOpen ? (
        <div className="flex flex-col w-[70rem] fixed bottom-0 pt-2 pb-6 px-6 mx-auto bg-[#F6F8F9] shadow-lg rounded-md border">
          <div className="flex flex-row justify-between align-center w-full mt-3">
            <span className="text-xl font-bold flex-shrink-0 pb-2">댓글</span>
            <HiOutlineChevronDoubleDown
              size={20}
              onClick={() => {return setIsCommentCreateOpen(false)}}
              className="hover:cursor-pointer"
            />
          </div>
          <Textarea
            className="w-full my-3 flex-shrink-0"
            bg="white"
            marginBottom={8}
            placeholder="댓글을 여기에 입력해주세요 :)"
          />
          <Button
            className="w-20 self-end"
            size="sm"
            bg="accent.500"
            color="white"
            marginBottom={6}
          >
            댓글달기
          </Button>
        </div>
      ) : (
        <div className="flex flex-row w-[70rem] justify-between align-center fixed bottom-0 pt-5 pb-3 px-6  mx-auto bg-[#F6F8F9] shadow-lg rounded-md border">
          <span className="text-xl font-bold flex-shrink-0">댓글</span>
          <HiOutlineChevronDoubleUp
            className="hover:cursor-pointer"
            size={20}
            onClick={() => {return setIsCommentCreateOpen(true)}}
          />
        </div>
      )}
    </div>
  );
};

export default CreateComment;
