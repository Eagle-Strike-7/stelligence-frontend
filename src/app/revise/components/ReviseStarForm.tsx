'use client';

import React, { useState } from 'react';
import { Star } from '@/types/newStar/newStarProps';
import StarTitleInput from '@/components/Common/Star/StarTitleInput';
import StarTagInput from '@/components/Common/Star/StarTagInput';
import AccentButton from '@/components/Common/Button/AccentButton';
import ReviseStarReason from './ReviseStarInfo/ReviseStarReason';
import ReviseStarContent from './ReviseStarContent/ReviseStarContent';
import ReviseStarDebate from './ReviseStarInfo/ReviseStarDebate';

// NOTE : 수정요청 패이지
// FIXME : 글 정보 묶기
const ReviseStarForm = () => {
  const [reviseStar, setReviseStar] = useState<Star>({
    title: '',
    tag: '',
    realtedDebate: '#1234',
    content: 'hello',
  });

  return (
    <form className="flex flex-col w-full pt-5 px-32">
      <StarTitleInput star={reviseStar} setStar={setReviseStar} />
      <div className="flex flex-row">
        <StarTagInput star={reviseStar} setStar={setReviseStar} />
        <ReviseStarDebate />
      </div>

      <ReviseStarReason />
      <ReviseStarContent />

      <AccentButton name="수정 요청하기" />
    </form>
  );
};

export default ReviseStarForm;
