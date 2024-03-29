'use client';

import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlineComment } from 'react-icons/ai';

const DebateButton = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const handleClickDebate = () => {
    onClose();
    router.push('/debate-list');
  };
  return (
    <Button
      leftIcon={<AiOutlineComment size="20px" />}
      variant="ghost"
      textColor="white"
      _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
      cursor="pointer"
      size="sm"
      rounded="sm"
      justifyContent="flex-start"
      onClick={handleClickDebate}
    >
      <h2 className="text-md text-semibold ">토론</h2>
    </Button>
  );
};

export default DebateButton;
