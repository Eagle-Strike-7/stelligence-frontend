import { NewStarProps } from '@/types/star/NewStarProps';
import { Input } from '@chakra-ui/react';
import React from 'react';

// NOTE : 제목을 입력받는 컴포넌트 (글쓰기, 수정)
const StarTitleInput = ({ star, setStar }: NewStarProps) => {
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStar({ ...star, title: e.target.value });
  };

  return (
    <div className="flex flex-row w-full mb-4">
      <span className="w-28 text-md font-bold mt-2 shrink-0">글 제목</span>
      <Input
        size="md"
        variant="outline"
        placeholder="글의 제목을 입력해 주세요"
        value={star.title}
        onChange={handleTitle}
      />
    </div>
  );
};

export default StarTitleInput;
