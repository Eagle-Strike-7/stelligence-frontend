import { Textarea } from '@chakra-ui/react';
import React from 'react';

const BeforeAfter = ({
  index,
  title,
  before,
  after,
}: {
  index: number;
  title: string;
  before: string;
  after: string;
}) => {
  return (
    <div className="flex flex-col gap-5">
      {/* SECTION 수정 요청 사항 제목 영역 */}
      <h1 className="text-lg font-bold text-center">
        수정 요청 사항 #{index + 1} : {title}
      </h1>
      {/* SECTION 수정 요청 사항 내용 영역 */}
      <div className="grid grid-cols-2 gap-5">
        {/* SECTION 수정 전 내용 영역 */}
        <div className="flex flex-col gap-1">
          <p className="text-center font-bold">수정 전</p>
          <Textarea
            isDisabled
            value={before}
            height="20rem"
            lineHeight="1.5rem"
            resize="none"
            padding={5}
            sx={{
              _disabled: {
                color: 'black',
              },
            }}
          />
        </div>
        {/* SECTION 수정 후 내용 영역 */}
        <div className="flex flex-col gap-1">
          <p className="text-center font-bold">수정 후</p>
          <Textarea
            isDisabled
            value={after}
            height="20rem"
            lineHeight="1.5rem"
            resize="none"
            padding={5}
            sx={{
              _disabled: {
                color: 'black',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfter;
