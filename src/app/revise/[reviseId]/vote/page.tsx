import TitleInput from '@/components/Common/TitleInput';
import Wrapper from '@/components/Common/Wrapper';
import { Textarea } from '@chakra-ui/react';
import React from 'react';

const Page = () => {
  return (
    <div>
      <Wrapper>
        {/* SECTION 수정요청 글 정보 영역 */}
        <div className="flex flex-col gap-4">
          <TitleInput
            title="제목"
            content="마리모에 대한 전반적인 수정 요청"
            isDisable
          />
          <TitleInput
            title="연관된 토론 번호"
            content="12345"
            isDisable
          />
          <TitleInput
            title="수정 요청자"
            content="독수리타법 7남매"
            isDisable
          />
          <TitleInput title="남은 투표 시간" content="2시간" isDisable />
          <div className="flex flex-col gap-2">
            <span>수정 요청 이유</span>
            <Textarea
              value="마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다."
              placeholder="내용을 입력해주세요"
              isDisabled
              sx={{
                _disabled: {
                  opacity: '1',
                },
              }}
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Page;
