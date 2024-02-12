import { Input } from '@chakra-ui/react';
import React from 'react';

interface StarTitleProps {
  inputTitle: string;
  title: string;
  setTitle: (title: string) => void;
}

// NOTE : 제목을 입력받는 컴포넌트 (글쓰기, 수정)
const StarTitleInput = ({ inputTitle, title, setTitle }: StarTitleProps) => {
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="flex flex-row w-full mb-4">
      {inputTitle === '글 제목' ? (
        <span className="w-28 text-white text-md font-bold mt-2 shrink-0">
          {inputTitle}
        </span>
      ) : (
        <span className="w-40 text-white text-md font-bold mt-2 shrink-0">
          {inputTitle}
        </span>
      )}
      <Input
        size="md"
        color="white"
        variant="outline"
        placeholder="글의 제목을 입력해 주세요"
        value={title}
        onChange={handleTitle}
      />
    </div>
  );
};

export default StarTitleInput;
