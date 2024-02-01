import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const RouteToList = () => {
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

export default RouteToList;
