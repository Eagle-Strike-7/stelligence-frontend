import React from 'react';
import LabelText from '@/components/Common/LabelText';
import { ReviseDataResponse } from '@/service/vote/voteService';

const ReviseInformation = ({
  reviseData,
}: {
  reviseData: ReviseDataResponse;
}) => {
  const calculateRemainTime = () => {
    const now = new Date();
    const endAt = new Date(reviseData.results.endAt);
    const remainTime = endAt.getTime() - now.getTime();
    if (!Number.isNaN(endAt.getTime()) && remainTime >= 0) {
      const minutes = Math.floor(remainTime / 60 / 1000);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      return `${days}일 ${hours % 24}시간 ${minutes % 60}분`;
    }
    return '0일 0시간 0분';
  };

  console.log(new Date(reviseData.results.endAt));

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4">
        <LabelText
          label="글 제목"
          text={reviseData?.results.documentTitle || '제목'}
        />
        <LabelText
          label="상위 계층 태그"
          text={reviseData?.results.parentDocumentId || '없음'}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <LabelText
          label="수정 요청안 제목"
          text={reviseData?.results.contributeTitle || '수정요청안 제목'}
        />
        <LabelText
          label="남은 투표 시간"
          text={
            reviseData.results.contributeStatus === 'VOTING'
              ? calculateRemainTime()
              : '종료된 투표'
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <LabelText
          label="수정 요청자"
          text={reviseData?.results.contributor.nickname || '수정요청자'}
        />
        <LabelText
          label="연관된 토론 번호"
          text={reviseData?.results.relatedDebateId || '없음'}
        />
      </div>
      <LabelText
        label="수정 요청 이유"
        text={reviseData?.results.contributeDescription || '수정 요청 이유'}
      />
    </div>
  );
};

export default ReviseInformation;
