'use client';

import React from 'react';
import { Button } from '@chakra-ui/react';
import { Heading } from '@/types/common/ResponseType';
import StarContent from '../../components/StarContent';

interface SectionShowProps {
  heading: Heading;
  title: string;
  content: string;
  // state: '읽기' | '추가';
  setState: (value: '읽기' | '수정' | '추가' | '삭제') => void;
}

const headSizeClass: { [key: string]: string } = {
  // TODO : option 수 생각하기
  H1: 'text-4xl',
  H2: 'text-3xl',
  H3: 'text-2xl',
};

// NOTE : 글의 섹션 한 개를 읽기모드로 보여주는 컴포넌트 (상세보기, 수정)
const ReviseStarSectionShow = ({
  heading,
  title,
  content,
  setState,
}: SectionShowProps) => {
  const headSize = headSizeClass[heading] || 'text-lg';

  const handleEditClick = () => {
    setState('수정');
  };

  const handleDeleteClick = () => {
    setState('삭제');
  };

  return (
    <div className="flex flex-col w-full mb-6">
      <div className="flex flex-row justify-between items-center justify-items-center mb-2">
        <span className={`${headSize} font-bold align-middle`}>{title}</span>
        <div className="space-x-2">
          <Button
            size="md"
            colorScheme="gray"
            variant="outline"
            h="2rem"
            onClick={handleEditClick}
          >
            수정
          </Button>
          <Button
            size="md"
            colorScheme="gray"
            variant="outline"
            h="2rem"
            onClick={handleDeleteClick}
          >
            삭제
          </Button>
        </div>
      </div>
      <StarContent content={content} />
    </div>
  );
};

export default ReviseStarSectionShow;
