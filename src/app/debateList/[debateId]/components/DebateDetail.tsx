import React from 'react';
import { Tag, Textarea } from '@chakra-ui/react';
import { Debate } from '../page.server';
import DebateSlider from './DebateSlider';

interface DeabteDetailProps {
  debateData: Debate | null;
}
const DebateDetail: React.FC<DeabteDetailProps> = ({ debateData }) => {
  return (
    <div>
      {debateData && (
        <div className="flex flex-col gap-6 my-5 border-2 border-gray-50 p-10 rounded-md bg-white">
          <div className="flex w-full">
            <h3 className="font-bold w-32 ">수정 요청안 제목</h3>
            <span>{debateData.contributeTitle}</span>
          </div>
          <div className="flex w-full">
            <div className="flex w-1/2">
              <h3 className="font-bold w-32 ">연관된 토론 번호</h3>
              <span>{debateData.contributeId.toString()}</span>
            </div>
            <div className="flex">
              <h3 className="font-bold w-32 ">상위 계층 태그</h3>
              <Tag>{debateData.documentTitle}</Tag>
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex w-1/2">
              <h3 className="font-bold w-32 ">수정 요청자</h3>
              <span>{debateData.contributor.nickname}</span>
            </div>
            <div className="flex w-1/2">
              <h3 className="font-bold w-32 ">남은 토론 시간</h3>
              <span>{debateData.endAt}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <span className="font-bold text-md">수정 요청 이유</span>
            <Textarea
              value={debateData.contributeDescription}
              placeholder="내용을 입력해주세요"
              isDisabled
              sx={{
                _disabled: {
                  opacity: '1',
                },
              }}
            />
          </div>
          {/* //TODO - 여기에 슬라이더 추가 */}
          <DebateSlider />
        </div>
      )}
    </div>
  );
};

export default DebateDetail;
