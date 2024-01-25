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
    <form onSubmit={handleSubmit} className="flex flex-col w-full pt-20 px-20">
      <NewStarTitle newStar={newStar} setNewStar={setNewStar} />
      <NewStarTag newStar={newStar} setNewStar={setNewStar} />
      <StarSectionInput inputTitle="본문" />

      <div className="flex justify-center">
        <Button
          mt="2.5rem"
          w="fit-content"
          size="lg"
          variant="solid"
          colorScheme="blue"
          background="accent.500"
          type="submit"
        >
          생성하기
        </Button>
      </div>
    </form>
  );
};

export default NewStarForm;
