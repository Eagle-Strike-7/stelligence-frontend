import React from 'react';
import LabelText from '@/components/Common/LabelText';

// TODO - type, heading, status는 열거형 or 유니온 타입으로 변경
/*
export const Type = {
  update: 'UPDATE',
  create: 'CREATE',
  delete: 'DELETE',
} as const;
export const Heading = {
  h1: 'H1',
  h2: 'H2',
  h3: 'H3',
  h4: 'H4',
  h5: 'H5',
  h6: 'H6',
} as const;
export const Status = {
  voting: 'VOTING',
  merged: 'MERGED',
  rejected: 'REJECTED',
  debating: 'DEBATING',
} as const;
*/

// NOTE - 수정요청 글의 정보 type
interface AmendmentData {
  amendmentId: number;
  type: string;
  targetSection: {
    sectionId: number;
    revision: number;
    heading: string;
    title: string;
    content: string;
  };
  requestedSectionHeading: string;
  requestedSectionTitle: string;
  requestedSectionContent: string;
  creatingOrder: number;
}
interface ReviseDataResponse {
  contributeId: number;
  contributeTitle: string;
  contributeDescription: string;
  contributeStatus: string;
  documentId: number;
  documentTitle: string;
  parentDocumentId: number;
  contributor: {
    memberId: number;
    nickname: string;
    profileImgUrl: string;
  };
  amendments: AmendmentData[];
  beforeDocumentTitle: string;
  afterDocumentTitle: string;
  beforeParentDocumentId: number;
  beforeParentDocumentTitle: string;
  afterParentDocumentId: number;
  afterParentDocumentTitle: string;
  endAt: string;
  relatedDebateId: number;
}

const ReviseInformation = ({
  reviseData,
}: {
  reviseData: ReviseDataResponse;
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4">
        <LabelText label="글 제목" text={reviseData.documentTitle || '제목'} />
        <LabelText
          label="상위 계층 태그"
          text={`${reviseData.parentDocumentId}` || '상위 계층 태그'}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <LabelText
          label="수정 요청안 제목"
          text={reviseData.contributeTitle || '수정요청안 제목'}
        />
        <LabelText label="남은 투표 시간" text="sss" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <LabelText
          label="수정 요청자"
          text={reviseData.contributor?.nickname || '수정요청자'}
        />
        <LabelText
          label="연관된 토론 번호"
          text={`#${reviseData.relatedDebateId || '연관된 토론 번호'}`}
        />
      </div>
      <LabelText
        label="수정 요청 이유"
        text={reviseData.contributeDescription || '수정 요청 이유'}
      />
    </div>
  );
};

export default ReviseInformation;
