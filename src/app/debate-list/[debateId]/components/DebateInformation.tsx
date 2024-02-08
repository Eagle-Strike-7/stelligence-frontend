import React from 'react';
import LabelText from '@/components/Common/LabelText';
import { Debate } from '../page.server';

// TODO ReviseInformation과 통일
const DebateInformation = ({ debateData }: { debateData: Debate }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4">
        <LabelText label="글 제목" text={debateData.documentTitle || '제목'} />
        <LabelText
          label="상위 계층 태그"
          text={`${debateData.documentId}` || '상위 계층 태그'}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <LabelText
          label="수정 요청안 제목"
          text={debateData.contributeTitle || '수정요청안 제목'}
        />
        <LabelText label="남은 투표 시간" text="sss" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <LabelText
          label="수정 요청자"
          text={debateData.contributor?.nickname || '수정요청자'}
        />
        <LabelText
          label="연관된 토론 번호"
          text={`#${debateData.documentId || '연관된 토론 번호'}`}
        />
      </div>
      <LabelText
        label="수정 요청 이유"
        text={debateData.contributeDescription || '수정 요청 이유'}
      />
    </div>
  );
};

export default DebateInformation;
