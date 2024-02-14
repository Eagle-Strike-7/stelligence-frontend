'use client';

import React from 'react';
import { Button } from '@chakra-ui/react';
import { IoRemoveOutline } from 'react-icons/io5';
import { AiOutlinePlusCircle } from 'react-icons/ai';

interface CreateButtonProps {
  state: '읽기' | '추가';
  setState: (value: '추가') => void;
}

// NOTE : 글의 내용을 추가하는 컴포넌트 (- + -)
const CreateButton = ({ state, setState }: CreateButtonProps) => {
  const handleClick = () => {
    setState('추가');
  };

  return (
    state === '읽기' && (
      <div className="flex flex-row w-full justify-center mt-6">
        <Button
          size="md"
          color="primary.500"
          variant="ghost"
          onClick={handleClick}
        >
          <IoRemoveOutline className="h-8 w-20" />
          <AiOutlinePlusCircle className="h-8 w-8" />
          <IoRemoveOutline className="h-8 w-20" />
        </Button>
      </div>
    )
  );
};

export default CreateButton;
