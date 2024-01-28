import { Button, Textarea } from '@chakra-ui/react';
import React from 'react';

const CreateComment = () => {
  return (
    <div className="flex flex-col w-full mb-6 ">
      <span className="w-32 text-lg font-bold mt-3 flex-shrink-0">댓글</span>
      <Textarea
        className="w-full my-3 flex-shrink-0 bg-gray-50"
        placeholder="댓글을 여기에 입력해주세요 :)"
      />
      <Button className="w-20 self-end" size="sm">
        댓글달기
      </Button>
    </div>
  );
};

export default CreateComment;
