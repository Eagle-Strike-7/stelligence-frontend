import React from 'react';
import LabelText from '@/components/Common/LabelText';
import { Tag } from '@chakra-ui/react';
import { Debate } from '../page.server';

// TODO ReviseInformation과 통일
const DebateInformation = ({ debateData }: { debateData: Debate }) => {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="font-bold text-left text-xl mb-4">개요</h3>
      <div className="grid grid-cols-2 gap-4">
        <LabelText
          label="수정 요청안 제목"
          text={debateData.contributeTitle || '수정요청안 제목'}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <LabelText label="글제목" text="sss" />
        <LabelText
          label="상위 계층 태그"
          text={`${debateData.documentId}` || '상위 계층 태그'}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <LabelText
          label="수정 요청자"
          text={debateData.contributor?.nickname || '수정요청자'}
        />
        <div className="flex">
          <h3 className="font-bold text-md w-36 text-white">남은토론시간</h3>
          <Tag className="text-md  text-black">2시간</Tag>
        </div>
      </div>

      <LabelText
        label="수정 요청 이유"
        text="asfadskfjlsadjflskajdflsajfdlskajdlkjslkfjdlskjflskdjflksjlkssfljsdlfkjalskdfjsaljflsjflksjdflksj sdjflksjflsjdlfsjflkdsjl"
      />
    </div>
  );
};

export default DebateInformation;
