'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import OutlineButton from '../Button/OutlineButton';

interface SectionShowProps {
  sectionTitle: string;
  sectionContent: string;
  setRevise?: (value: string) => void;
}

// NOTE : 글의 섹션 한 개를 읽기모드로 보여주는 컴포넌트 (상세보기, 수정)
const StarSectionShow = ({
  sectionTitle,
  sectionContent,
  setRevise,
}: SectionShowProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center justify-items-center mb-2">
        <span className="text-lg font-bold align-middle">{sectionTitle}</span>
        {pathname === '/revise' &&
          setRevise && ( // 수정페이지에서는 버튼 표시
            <div className="space-x-2">
              <OutlineButton name="편집" setRevise={setRevise} />
              <OutlineButton name="삭제" setRevise={setRevise} />
            </div>
          )}
      </div>

      <div className="border-2 rounded-lg p-4 bg-gray-50 text-md">
        {sectionContent}
      </div>
    </div>
  );
};

export default StarSectionShow;
