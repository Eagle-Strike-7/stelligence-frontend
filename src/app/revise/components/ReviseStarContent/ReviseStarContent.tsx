'use client';

import React from 'react';
import dummyContentData from '@/constants/dummyContentData';
import ReviseStarSection from './ReviseStarSection';

export interface StarSectionProps {
  id: number;
  sectionTitle: string;
  sectionContent: string;
}

// NOTE : 글 내용을 보여주는 컴포넌트 (글 정보 제외, 수정)
// FIXME : 추가 버튼을 section 안으로 넣을지 고민해야함
const ReviseStarContent = () => {
  return (
    <div className="flex flex-col w-full my-16">
      {dummyContentData.map((data: StarSectionProps) => {
        return (
          <ReviseStarSection
            key={data.id}
            id={data.id}
            sectionTitle={data.sectionTitle}
            sectionContent={data.sectionContent}
          />
        );
      })}
    </div>
  );
};

export default ReviseStarContent;
