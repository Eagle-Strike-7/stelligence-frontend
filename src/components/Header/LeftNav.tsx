import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { AiOutlineComment, AiOutlineLike } from 'react-icons/ai';

const LeftNav = () => {
  return (
    <div className="flex ml-20 w-40">
      <div className="inline mr-4">
        <Link href="/vote-list">
          <Button
            leftIcon={<AiOutlineLike size="20px" />}
            variant="ghost"
            textColor="white"
            _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
            cursor="pointer"
            size="sm"
            rounded="sm"
          >
            <h2 className="text-md text-semibold">투표</h2>
          </Button>
        </Link>
      </div>
      <div className="inline">
        <Link href="/debate-list">
          <Button
            leftIcon={<AiOutlineComment size="20px" />}
            variant="ghost"
            textColor="white"
            _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
            cursor="pointer"
            size="sm"
            rounded="sm"
          >
            <h2 className="text-md text-semibold">토론</h2>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LeftNav;
