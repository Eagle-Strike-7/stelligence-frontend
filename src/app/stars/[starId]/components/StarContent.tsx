import React from 'react';
import StarSectionShow from '@/components/Common/Star/StarSectionShow';
import dummyContentData from '@/constants/dummyContentData';
import { StarSectionProps } from '@/app/revise/components/ReviseStarContent/ReviseStarSection';

// NOTE : 상세보기 페이지, 글의 내용을 보여주는 컴포넌트
const StarContent = () => {
  return (
    <div className="flex flex-col w-full my-16">
      {dummyContentData.map((data: StarSectionProps) => {
        return (
          <StarSectionShow
            key={data.id}
            sectionTitle={data.sectionTitle}
            sectionContent={data.sectionContent}
          />
        );
      })}
    </div>
  );
};

export default StarContent;
