import BeforeAfter from '@/components/Common/BeforeAfter';
import Wrapper from '@/components/Common/Wrapper';
import { Card, Input } from '@chakra-ui/react';
import React from 'react';
import ReviseInformation from '@/app/vote-list/[voteId]/components/ReviseInformation';
import Vote from './components/Vote';

// FIXME 백엔드 통신 이후 삭제
const dummyReviseData = {
  contributeId: 2,
  contributeTitle: '마리모에 대한 전반적인 수정 요청',
  contributeDescription:
    '마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.',
  contributeStatus: 'VOTING',
  documentId: 1,
  documentTitle: '마리모',
  parentDocumentId: 456,
  contributor: {
    memberId: 101,
    nickname: '독수리타법 7남매',
    profileImgUrl: '',
  },
  amendments: [
    {
      amendmentId: 123,
      type: 'UPDATE',
      targetSection: {
        // 수정 전
        sectionId: 456,
        revision: 8,
        heading: 'H1',
        title: '마리모는 식물이 아닙니다.',
        content: '마리모는 동물이다.',
      },
      // 수정 후
      requestedSectionHeading: 'H1',
      requestedSectionTitle: '마리모는 식물입니다',
      requestedSectionContent: '마리모는 식물입니다 절대 동물일 수가 없습니다',
      creatingOrder: 1,
    },
  ],
  beforeDocumentTitle: '가나다라마사아자차카타파하가나',
  afterDocumentTitle: '가나다라마사아자차카타파하가나',
  beforeParentDocumentId: 987,
  beforeParentDocumentTitle: '녹조류',
  afterParentDocumentId: 456,
  afterParentDocumentTitle: '양서류',
  endAt: '2024-05-15T09:32',
  relatedDebateId: 45384,
};

const dummyVoteData = {
  agreePercent: 30,
  disagreePercent: 70,
  agreeNum: 30,
  disagreeNum: 70,
};
const Page = () => {
  return (
    <Wrapper>
      <div className="pt-5">
        {/* TODO 페이지 제목 - 공통컴포넌트로 분리 */}
        <div className="flex flex-col gap-1 mb-16">
          <h1 className="text-3xl font-bold">투표하기</h1>
          <p className="text-sm">수정요청 반영 여부에 대해 투표하세요! </p>
        </div>
        <div className="flex flex-col gap-8">
          {/* SECTION 수정요청 글 정보 영역 */}
          <ReviseInformation reviseData={dummyReviseData} />
          <hr />
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">수정 요청 사항</h2>
            <div className="grid grid-cols-2 mb-10">
              <p className="text-lg text-center text-gray-500">수정 전</p>
              <p className="text-lg text-center text-gray-500">수정 후</p>
            </div>
            {/* SECTION 글 제목 */}
            {dummyReviseData.beforeDocumentTitle ===
              dummyReviseData.afterDocumentTitle || (
              <div className="mb-6">
                <h3 className="text font-bold">글 제목</h3>
                <div className="grid grid-cols-2 mt-2 gap-4">
                  <Input
                    isDisabled
                    value={dummyReviseData.beforeDocumentTitle}
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
                    value={dummyReviseData.afterDocumentTitle}
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
            {dummyReviseData.beforeParentDocumentTitle ===
              dummyReviseData.afterParentDocumentTitle || (
              <div>
                <h3 className="text font-bold">상위 계층 태그</h3>
                <div className="grid grid-cols-2 mt-2 gap-4">
                  <Input
                    isDisabled
                    value={dummyReviseData.beforeParentDocumentTitle}
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
                    value={dummyReviseData.afterParentDocumentTitle}
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
              {dummyReviseData.amendments.map((amendment, index) => {
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
            <Vote
              agreePercent={dummyVoteData.agreePercent}
              disAgreePercent={dummyVoteData.disagreePercent}
              agreeNum={dummyVoteData.agreeNum}
              disAgreeNum={dummyVoteData.disagreeNum}
            />
          </Card>
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;
