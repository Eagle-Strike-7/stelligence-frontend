'use client';

import React, { useState } from 'react';
import StarSectionInput from '@/components/Common/Star/StarSectionInput/StarSectionInput';
import StarTitleInput from '@/components/Common/Star/StarTitleInput';
import StarTagInput from '@/components/Common/Star/StarTagInput';
import { NewStar } from '@/types/star/NewStarProps';
import AccentButton from '@/components/Common/Button/AccentButton';
import { useRouter } from 'next/navigation';
import apiClient from '@/service/login/axiosClient';

const NewStarForm = () => {
  const router = useRouter();
  const [newStar, setNewStar] = useState<NewStar>({
    title: '',
    documentId: 0,
    content: 'hello',
  });

  const postNewStar = async (star: NewStar) => {
    try {
      const response = await apiClient.post(
        `/api/documents`,
        JSON.stringify(star),
      );
      console.log('response', response.data); // FIXME : 기능완성 시 삭제예정
      if (response.data.success) {
        // 요청 성공하면 해당 문서로 이동
        const { documentId } = response.data.results;
        router.push(`/stars/${documentId}`);
      }
    } catch (error) {
      // 요청 실패하면 에러 출력
      alert('요청 실패');
      console.error('Error:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const startsWithH2orH3 = /^<(h1|h2|h3)>/i;
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
