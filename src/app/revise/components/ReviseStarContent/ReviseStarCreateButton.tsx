'use client';

import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { IoRemoveOutline } from 'react-icons/io5';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import ReviseStarSectionInput from './ReviseStarSectionInput';

// NOTE : 글의 내용을 추가하는 컴포넌트 (- + -)
const ReviseStarCreateButton = ({
  setRevise,
}: {
  setRevise: (value: string) => void;
}) => {
  const [create, setCreate] = useState(false);
  const handleClick = () => {
    setCreate(true);
  };

  return create === false ? (
    <div className="flex flex-row w-full justify-center mt-6">
      <Button
        size="md"
        colorScheme="gray"
        variant="ghost"
        onClick={handleClick}
      >
        <IoRemoveOutline className="h-8 w-20 text-gray-300" />
        <AiOutlinePlusCircle className="h-8 w-8 text-gray-300" />
        <IoRemoveOutline className="h-8 w-20 text-gray-300" />
      </Button>
    </div>
  ) : (
    <ReviseStarSectionInput setCreate={setCreate} setRevise={setRevise} />
  );
};

export default ReviseStarCreateButton;
