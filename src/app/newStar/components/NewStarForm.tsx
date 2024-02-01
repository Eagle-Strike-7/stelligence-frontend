'use client';

import React, { useState } from 'react';
import StarSectionInput from '@/components/Common/Star/StarSectionInput/StarSectionInput';
import StarTitleInput from '@/components/Common/Star/StarTitleInput';
import StarTagInput from '@/components/Common/Star/StarTagInput';
import { Star } from '@/types/newStar/newStarProps';
import AccentButton from '@/components/Common/Button/AccentButton';

const NewStarForm = () => {
  const [newStar, setNewStar] = useState<Star>({
    title: '',
    tag: '',
    content: 'hello',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newStar.title === '') {
      alert('제목을 입력해주세요');
    } else if (newStar.tag === '') {
      alert('상위 계층 태그를 연결해주세요');
    } else if (newStar.content === '') {
      alert('본문을 입력해주세요');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full pt-5 px-32">
      <StarTitleInput star={newStar} setStar={setNewStar} />
      <StarTagInput star={newStar} setStar={setNewStar} />

      <div className="flex flex-col w-full">
        <div className="text-md font-bold mb-2">본문</div>
        <StarSectionInput />
      </div>

      <AccentButton name="생성하기" />
    </form>
  );
};

export default NewStarForm;
