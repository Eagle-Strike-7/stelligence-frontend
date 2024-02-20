import React from 'react';
import LabelText from '@/components/Common/LabelText';
import { Tag } from '@chakra-ui/react';
import { Contribute } from '@/types/common/Amendment';
import calculateRemainTime from '@/lib/calculateRemainTime';
import Link from 'next/link';
import MiddleTitle from '../../../../../../components/Common/Title/MiddleTitle';

// TODO ReviseInformation과 통일
const DebateInformation = ({
  contributeData,
  debateEndAt,
  documentId,
  upperTagId,
}: {
  contributeData: Contribute;
  debateEndAt: string;
  documentId: number;
  upperTagId: number;
}) => {
  const leftDebateTime = calculateRemainTime(debateEndAt);

  return (
    <div className="flex flex-col gap-5 mb-6">
      <MiddleTitle title="개요" color="white" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <LabelText
          label="수정 요청안 제목"
          text={contributeData.contributeTitle || 'X'}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
        <Link href={`/stars/${documentId}`}>
          <LabelText label="글제목" text={contributeData.documentTitle} />
        </Link>

        <div className="flex">
          <h3 className="font-bold text-md w-36 text-white">상위계층태그</h3>
          {contributeData.parentDocumentTitle ? (
            <Link href={`/stars/${upperTagId}`}>
              <Tag className="text-md  text-black">
                {contributeData.beforeParentDocumentTitle}
              </Tag>
            </Link>
          ) : (
            'X'
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
