import React from 'react';
import LabelText from '@/components/Common/LabelText';
import { ReviseDataResponse } from '@/service/vote/voteService';
import calculateRemainTime from '@/lib/calculateRemainTime';
import { Tag } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const ReviseInformation = ({
  reviseData,
}: {
  reviseData: ReviseDataResponse;
}) => {
  const router = useRouter();
  const handleClickParentDocument = () => {
    router.push(`/stars/${reviseData.results.parentDocumentId}`);
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4">
        <LabelText
          label="글 제목"
          text={reviseData?.results.documentTitle || '없음'}
        />
        <div className="flex">
          <h3 className="font-bold text-md w-36 text-white">상위 계층 태그</h3>
          {reviseData?.results.parentDocumentTitle ? (
            <Tag
              className="text-md text-white"
              _hover={{
                cursor: 'pointer',
              }}
              onClick={handleClickParentDocument}
            >
              {reviseData?.results.parentDocumentTitle}
            </Tag>
          ) : (
            <p className="text-md text-white">없음</p>
          )}
        </div>
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
