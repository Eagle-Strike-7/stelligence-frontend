import { NewStarProps } from '@/types/newStar/newStarProps';
import { Input } from '@chakra-ui/react';
import React from 'react';

const NewStarTitle = ({ newStar, setNewStar }: NewStarProps) => {
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStar({ ...newStar, title: e.target.value });
  };

  return (
    <div className="flex flex-row w-full mb-4 flex-grow">
      <span className="w-32 text-md font-bold mt-3 flex-shrink-0">글 제목</span>
      <Input
        size="md"
        variant="outline"
        placeholder="글의 제목을 입력해 주세요"
        value={newStar.title}
        onChange={handleTitle}
      />
    </div>
  );
};

export default NewStarTitle;
