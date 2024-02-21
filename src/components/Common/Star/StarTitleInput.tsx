import handleKeyDown from '@/lib/handleKeyDown';
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
    <div className="flex flex-col w-full mb-4">
      {inputTitle === '글 제목' ? (
        <span className=" text-white text-lg font-bold mt-2 mb-2 shrink-0">
          {inputTitle}
        </span>
      ) : (
        <span className=" text-white text-lg font-bold mt-2 mb-2 shrink-0">
          {inputTitle}
        </span>
      )}
      <Input
        size="md"
        bgColor="#303134"
        border="none"
        color="white"
        variant="outline"
        placeholder="글의 제목을 입력해 주세요"
        errorBorderColor="red.300"
        value={title}
        onChange={handleTitle}
        onKeyDown={e => {
          handleKeyDown(e);
        }}
      />
    </div>
  );
};

export default StarTitleInput;
