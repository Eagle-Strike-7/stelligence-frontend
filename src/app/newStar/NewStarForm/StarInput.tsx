import { Input } from '@chakra-ui/react';
import React from 'react';

// NOTE : 제목, 상위 계층 태그를 위한 컴포넌트
// FIXME : 수정 요청 페이지 UI 고려 후 공통 컴포넌트로 변경 예정

interface StarInputProps {
  divMarginBottom?: number;
  inputTitleWidth: number;
  inputTitle: string;
  inputPlaceholder: string;
}

const StarInput = ({
  divMarginBottom = 6,
  inputTitleWidth,
  inputTitle,
  inputPlaceholder,
}: StarInputProps) => {
  return (
    <div className={`flex flex-row w-full mb-${divMarginBottom}`}>
      <span
        className={`w-${inputTitleWidth} text-lg font-bold mt-3 flex-shrink-0`}
      >
        {inputTitle}
      </span>
      <Input size="lg" variant="outline" placeholder={inputPlaceholder} />
    </div>
  );
};

export default StarInput;
