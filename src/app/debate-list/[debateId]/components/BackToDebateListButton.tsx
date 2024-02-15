import React from 'react';
import Link from 'next/link';
import { Button } from '@chakra-ui/react';

const BackToDebateListButton = () => {
  return (
    <div className="w-full flex justify-end">
      <Link href="/debate-list">
        <Button
          variant="outline"
          borderColor="primary.500"
          size="sm"
          color="primary.500"
          bg="none"
        >
          토론장목록으로 가기
        </Button>
      </Link>
    </div>
  );
};

export default BackToDebateListButton;
