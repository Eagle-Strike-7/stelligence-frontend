import React, { useState } from 'react';
import StarSectionShow from '@/components/Common/Star/StarSectionShow';
import ReviseStarSectionInput from './ReviseStarSectionInput';
import ReviseStarCreateButton from './ReviseStarCreateButton';

export interface StarSectionProps {
  id: number;
  sectionTitle: string;
  sectionContent: string;
}

// NOTE : 글의 한 섹션을 나타내는 컴포넌트 (읽기상태 + 수정상태)
const ReviseStarSection = ({
  id,
  sectionTitle,
  sectionContent,
}: StarSectionProps) => {
  const [revise, setRevise] = useState('완료');
  // 삭제 상태에서는?
  return (
    <>
      {id === 1 && <ReviseStarCreateButton setRevise={setRevise} />}
      {revise === '완료' && ( // 완료 상태에서는 읽기모드
        <>
          <StarSectionShow
            key={id}
            sectionTitle={sectionTitle}
            sectionContent={sectionContent}
            setRevise={setRevise}
          />
          <ReviseStarCreateButton setRevise={setRevise} />
        </>
      )}
      {revise === '편집' && (
        // 추가, 편집 상태에서는 글쓰기 모드
        <ReviseStarSectionInput setRevise={setRevise} />
      )}
    </>
  );
};

export default ReviseStarSection;
