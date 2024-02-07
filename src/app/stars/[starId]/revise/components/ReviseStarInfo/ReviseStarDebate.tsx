import { Input } from '@chakra-ui/react';
import React from 'react';

// NOTE : 연관된 토론 번호를 보여주는 컴포넌트 (수정)
const ReviseStarDebate = () => {
  return (
    <div className="flex flex-row mb-4">
      <span className="w-32 text-md font-bold mt-2 shrink-0">
        연관된 토론 번호
      </span>
      <Input size="md" variant="outline" value="#1234" isReadOnly />
    </div>
  );
};

export default ReviseStarDebate;
