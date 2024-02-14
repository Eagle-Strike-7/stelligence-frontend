import React from 'react';
import LabelText from '@/components/Common/LabelText';
import { Tag } from '@chakra-ui/react';
import { Contribute } from '@/types/common/Amendment';
import calculateRemainTime from '@/lib/calculateRemainTime';
import MiddleTitle from './MiddleTitle';

// TODO ReviseInformation과 통일
const DebateInformation = ({
  contributeData,
  debateEndAt,
}: {
  contributeData: Contribute;
  debateEndAt: string;
}) => {
  const leftDebateTime = calculateRemainTime(debateEndAt);

  return (
    <div className="flex flex-col gap-8 mb-4">
      <MiddleTitle title="개요" color="white" />
      <div className="grid grid-cols-2 gap-4">
        <LabelText
          label="수정 요청안 제목"
          text={contributeData.contributeTitle || 'X'}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <LabelText label="글제목" text={contributeData.documentTitle} />
        <div className="flex">
          <h3 className="font-bold text-md w-36 text-white">상위계층태그</h3>
          {contributeData.parentDocumentTitle ? (
            <Tag className="text-md  text-black">
              {contributeData.beforeParentDocumentTitle}
            </Tag>
          ) : (
            'X'
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <LabelText
          label="수정 요청자"
          text={contributeData.contributor.nickname || 'X'}
        />

        <LabelText label="남은 토론 시간" text={leftDebateTime || 'X'} />
      </div>

      <LabelText
        label="수정 요청 이유"
        text={contributeData.contributeDescription || 'X'}
      />
    </div>
  );
};

export default DebateInformation;
