'use client';

import React, { useState } from 'react';
import StarSectionInput from '@/components/Common/Star/StarSectionInput/StarSectionInput';
import StarTitleInput from '@/components/Common/Star/StarTitleInput';
import StarTagInput from '@/components/Common/Star/StarTagInput';
import { Star } from '@/types/newStar/newStarProps';
import AccentButton from '@/components/Common/Button/AccentButton';
import axios from 'axios';

const NewStarForm = () => {
  const [newStar, setNewStar] = useState<Star>({
    title: '',
    documentId: 0,
    content: 'hello',
  });

  const postNewStar = async (star: Star) => {
    const tempUrl =
      'http://ec2-43-203-87-227.ap-northeast-2.compute.amazonaws.com/api/documents';

    try {
      const response = await axios.post<Star>(tempUrl, JSON.stringify(star), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const startsWithH2orH3 = /^<(h2|h3)>/i;
    if (newStar.title === '') {
      alert('제목을 입력해주세요');
    } else if (newStar.content === '') {
      alert('본문을 입력해주세요');
    } else if (startsWithH2orH3.test(newStar.content) === false) {
      alert(
        '본문은 소제목으로 시작해야 합니다.\n##, ###을 통해 소제목을 생성해주세요.',
      );
    } else {
      console.log(newStar);
      postNewStar(newStar);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full pt-5 px-32">
      <StarTitleInput star={newStar} setStar={setNewStar} />
      <StarTagInput star={newStar} setStar={setNewStar} />

      <div className="flex flex-col w-full">
        <div className="text-md font-bold mb-2">본문</div>
        <StarSectionInput star={newStar} setStar={setNewStar} />
      </div>

      <AccentButton name="생성하기" />
    </form>
  );
};

export default NewStarForm;
