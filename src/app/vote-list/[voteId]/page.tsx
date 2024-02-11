'use client';

import BeforeAfter from '@/components/Common/BeforeAfter';
import Wrapper from '@/components/Common/Wrapper';
import { Card, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ReviseInformation from '@/app/vote-list/[voteId]/components/ReviseInformation';
import PageTitleDescription from '@/components/Common/PageTitleDescription';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import {
  ReviseDataResponse,
  VoteResponse,
  getReviseData,
  getVoteData,
} from '@/service/vote/voteService';
import Vote from './components/Vote';

const Page = () => {
  const [status, setStatus] = useState<string | undefined>('DEFAULT');
  const contributeId = Number(useParams().voteId);

  const { data: contributeData, isLoading } = useQuery<ReviseDataResponse>({
    queryKey: ['contribute', contributeId],
    queryFn: () => {
      return getReviseData(contributeId);
    },
  });

  const { data: voteData } = useQuery<VoteResponse>({
    queryKey: ['vote', contributeId],
    queryFn: () => {
      return getVoteData(contributeId);
    },
  });

  useEffect(() => {
    setStatus(contributeData?.results.contributeStatus ?? 'DEFAULT');
  }, [contributeData]);

  console.log(`${status}`);
  if (isLoading) {
    return (
      <Wrapper>
        <div>웜홀 타고 이동중...🧑‍🚀</div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="pt-5">
        <PageTitleDescription
          title={status === 'VOTING' ? '투표하기' : '투표 결과'}
          description="수정요청 반영 여부에 대해 투표하세요!"
        />
        <div className="flex flex-col gap-8">
          {/* SECTION 수정요청 글 정보 영역 */}
          {contributeData && <ReviseInformation reviseData={contributeData} />}
          <hr />
          {/* SECTION 수정요청 사항 영역 */}
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">수정 요청 사항</h2>
            <div className="grid grid-cols-2 mb-10">
              <p className="text-lg text-center text-gray-500">수정 전</p>
              <p className="text-lg text-center text-gray-500">수정 후</p>
            </div>
            {/* SECTION 글 제목 변경사항 */}
            {contributeData?.results.beforeDocumentTitle ===
              contributeData?.results.afterDocumentTitle || (
              <div className="mb-6">
                <h3 className="text font-bold">글 제목</h3>
                <div className="grid grid-cols-2 mt-2 gap-4">
                  <Input
                    isDisabled
                    value={contributeData?.results.beforeDocumentTitle}
                    bg="white"
                    textAlign="center"
                    paddingY="1.5rem"
                    sx={{
                      _disabled: {
                        color: 'black',
                      },
                    }}
                  />
                  <Input
                    isDisabled
                    value={contributeData?.results.afterDocumentTitle}
                    bg="white"
                    textAlign="center"
                    paddingY="1.5rem"
                    sx={{
                      _disabled: {
                        color: 'black',
                      },
                    }}
                  />
                </div>
              </div>
            )}
            {/* SECTION 상위 계층 태그 변경사항 */}
            {contributeData?.results.beforeParentDocumentTitle ===
              contributeData?.results.afterParentDocumentTitle || (
              <div>
                <h3 className="text font-bold">상위 계층 태그</h3>
                <div className="grid grid-cols-2 mt-2 gap-4">
                  <Input
                    isDisabled
                    value={contributeData?.results.beforeParentDocumentTitle}
                    bg="white"
                    textAlign="center"
                    paddingY="1.5rem"
                    sx={{
                      _disabled: {
                        color: 'black',
                      },
                    }}
                  />
                  <Input
                    isDisabled
                    value={contributeData?.results.afterParentDocumentTitle}
                    bg="white"
                    textAlign="center"
                    paddingY="1.5rem"
                    sx={{
                      _disabled: {
                        color: 'black',
                      },
                    }}
                  />
                </div>
              </div>
            )}
            {/* SECTION 상위 계층 태그 */}
            {/* SECTION 수정요청 사항 내용 영역 */}
            <div className="flex flex-col gap-16 mt-16">
              {contributeData?.results.amendments?.map((amendment, index) => {
                return (
                  <BeforeAfter
                    key={amendment.amendmentId}
                    index={index}
                    beforeHeading={amendment.targetSection.heading}
                    afterHeading={amendment.requestedSectionHeading}
                    beforeTitle={amendment.targetSection.title}
                    afterTitle={amendment.requestedSectionTitle}
                    beforeContent={amendment.targetSection.content}
                    afterContent={amendment.requestedSectionContent}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {/* SECTION 투표 영역 */}
        <div className="mt-16">
          <Card padding="2rem">
            {voteData && (
              <Vote
                voteData={voteData}
                contributeId={contributeId}
                status={status}
              />
            )}
          </Card>
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;
