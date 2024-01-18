import { Button, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { AiOutlineComment, AiOutlineLike } from 'react-icons/ai';

const Navigation = () => {
  return (
    <div className="flex ml-20 w-12">
      <div className="inline mr-2">
        <Link href="/voteList">
          <Button
            leftIcon={<AiOutlineLike size="20px" />}
            variant="ghost"
            textColor="white"
            _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
            cursor="pointer"
            size="sm"
          >
            <Heading size="sm" fontWeight={600}>
              투표
            </Heading>
          </Button>
        </Link>
      </div>
      <div className="inline">
        <Link href="/debateList">
          <Button
            leftIcon={<AiOutlineComment size="20px" />}
            variant="ghost"
            textColor="white"
            _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
            cursor="pointer"
            size="sm"
          >
            <Heading size="sm" fontWeight={600}>
              토론
            </Heading>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
