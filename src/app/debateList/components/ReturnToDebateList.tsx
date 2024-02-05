import React from 'react';
import Link from 'next/link';
import { Button } from '@chakra-ui/react';

const ReturnToDebateList = () => {
  return (
    <div className="w-full flex justify-end">
      <Link href="/debateList">
        <Button variant="outline" size="sm">
          토론장목록으로 가기
        </Button>
      </Link>
    </div>
  );
};

export default ReturnToDebateList;
