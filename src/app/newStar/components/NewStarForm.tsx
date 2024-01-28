'use client';

import React, { useState } from 'react';
import StarSectionInput from '@/components/Common/StarSectionInput';
import { Button } from '@chakra-ui/react';
import NewStarTitle from './NewStarTitle';
import NewStarTag from './NewStarTag';

const NewStarForm = () => {
  const [newStar, setNewStar] = useState({
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
      <div className="">
        <NewStarTitle newStar={newStar} setNewStar={setNewStar} />
        <NewStarTag newStar={newStar} setNewStar={setNewStar} />
      </div>
      <StarSectionInput inputTitle="본문" />

      <div className="flex justify-center">
        <Button
          marginY="2rem"
          // w="fit-content"
          size="sm"
          variant="solid"
          colorScheme="blue"
          background="accent.500"
          type="submit"
          paddingX="1.5rem"
          paddingY="1.2rem"
        >
          생성하기
        </Button>
      </div>
    </form>
  );
};

export default NewStarForm;
