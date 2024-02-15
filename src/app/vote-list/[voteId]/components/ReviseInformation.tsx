import React from 'react';
import LabelText from '@/components/Common/LabelText';
import { ReviseDataResponse } from '@/service/vote/voteService';
import calculateRemainTime from '@/lib/calculateRemainTime';

const ReviseInformation = ({
  reviseData,
}: {
  reviseData: ReviseDataResponse;
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4">
        <LabelText
          label="글 제목"
          text={reviseData?.results.documentTitle || '없음'}
        />
        <LabelText
          label="상위 계층 태그"
          text={reviseData?.results.parentDocumentId || '없음'}
        />
        <LabelText
          label="수정 요청안 제목"
          text={reviseData?.results.contributeTitle || '없음'}
        />
        <LabelText
          label="남은 투표 시간"
          text={
            reviseData.results.contributeStatus === 'VOTING'
              ? calculateRemainTime(reviseData.results.endAt)
              : '종료된 투표'
          }
        />
        <LabelText
          label="수정 요청자"
          text={reviseData?.results.contributor.nickname || '없음'}
        />
      </div>
      <LabelText
        label="수정 요청 이유"
        text={reviseData?.results.contributeDescription || '없음'}
      />
    </div>
  );
};

export default ReviseInformation;
