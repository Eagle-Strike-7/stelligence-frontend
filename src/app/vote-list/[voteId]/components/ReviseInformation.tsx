import React from 'react';
import LabelText from '@/components/Common/LabelText';
import { ReviseDataResponse } from '@/service/vote/voteService';
import calculateRemainTime from '@/lib/calculateRemainTime';
import { Tag } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import MiddleTitle from '@/components/Common/Title/MiddleTitle';

const ReviseInformation = ({
  reviseData,
}: {
  reviseData: ReviseDataResponse;
}) => {
  const router = useRouter();
  const handleClickParentDocument = () => {
    router.push(`/stars/${reviseData.results.parentDocumentId}`);
  };

  const translateStatus = {
    VOTING: { name: '투표중', color: 'gray.200' },
    MERGED: { name: '반영 완료', color: 'primary.500' },
    DEBATING: { name: '토론', color: 'secondary.500' },
    REJECTED: { name: '미반영', color: 'tertiary.500' },
  };
  return (
    <div>
      <div className="mb-8 flex flex-row gap-4">
        <MiddleTitle title="개요" color="white" />
        <Tag
          size="md"
          fontWeight="bold"
          height="fit-content"
          bgColor={
            translateStatus[reviseData.results.contributeStatus]
              ? translateStatus[reviseData.results.contributeStatus].color
              : 'gray'
          }
        >
          {translateStatus[reviseData.results.contributeStatus]
            ? translateStatus[reviseData.results.contributeStatus].name
            : ''}
        </Tag>
      </div>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          <LabelText
            label="글 제목"
            text={reviseData?.results.documentTitle || '없음'}
          />
          <div className="flex">
            <h3 className="font-bold text-md w-36 text-white">
              상위 계층 태그
            </h3>
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
    </div>
  );
};

export default ReviseInformation;
