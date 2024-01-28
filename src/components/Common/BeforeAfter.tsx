import { Textarea } from '@chakra-ui/react';
import React from 'react';

const BeforeAfter = ({
  title,
  before,
  after,
}: {
  title: string;
  before: string;
  after: string;
}) => {
  return (
    <div className="">
      {/* SECTION 수정 요청 사항 제목 영역 */}
      <h1 className="">수정 요청 사항 : {title}</h1>
      {/* SECTION 수정 요청 사항 내용 영역 */}
      <div className="">
        {/* SECTION 수정 전 내용 영역 */}
        <div>
          <p className="">수정 전</p>
          <Textarea
            isDisabled
            value={before}
            height="15rem"
            resize="none"
            sx={{
              _disabled: {
                color: 'black',
              },
            }}
          />
        </div>
        {/* SECTION 수정 후 내용 영역 */}
        <div>
          <p className="">수정 후</p>
          <Textarea
            isDisabled
            value={after}
            height="15rem"
            resize="none"
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
