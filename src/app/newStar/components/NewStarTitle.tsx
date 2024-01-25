import { NewStarProps } from '@/types/newStar/newStarProps';
import { Input } from '@chakra-ui/react';
import React from 'react';

const NewStarTitle = ({ newStar, setNewStar }: NewStarProps) => {
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStar({ ...newStar, title: e.target.value });
  };

  return (
    <div className="flex flex-row w-full mb-6">
      <span className="w-32 text-lg font-bold mt-3 flex-shrink-0">글 제목</span>
      <Input
        size="lg"
        variant="outline"
        placeholder="글의 제목을 입력해 주세요"
        value={newStar.title}
        onChange={handleTitle}
      />
    </div>
  );
};

export default NewStarTitle;
