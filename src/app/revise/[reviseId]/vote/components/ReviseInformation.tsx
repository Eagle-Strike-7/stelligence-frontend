import React from 'react';
import LabelText from '@/components/Common/LabelText';

// FIXME - 백엔드 api 확인 후 변경
// NOTE - 수정요청 글의 정보 type
interface ReviseDataProps {
  documentTitle: string;
  contributeTitle: string;
  relatedDebateNum: string; // FIXME - 백엔드 필드명 확인 후 변경
  parentTitle: string;
  contributorNickname: string;
  remainVoteTime: number; // FIXME - 백엔드 필드명 확인 후 변경
  contributeDescription: string;
}

const ReviseInformation = ({ reviseData }: { reviseData: ReviseDataProps }) => {
  return (
    <div className="flex flex-col gap-6">
      <LabelText label="글 제목" text={reviseData.documentTitle} />
      <LabelText label="수정 요청안 제목" text={reviseData.contributeTitle} />
      <div className="grid grid-cols-2 gap-4">
        <LabelText
          label="연관된 토론 번호"
          text={`#${reviseData.relatedDebateNum}`}
        />
        <LabelText label="상위 계층 태그" text={reviseData.parentTitle} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <LabelText label="수정 요청자" text={reviseData.contributorNickname} />
        <LabelText
          label="남은 투표 시간"
          text={`${reviseData.remainVoteTime}분`}
        />
      </div>
      <LabelText
        label="수정 요청 이유"
        text={reviseData.contributeDescription}
      />
    </div>
  );
};

export default ReviseInformation;
