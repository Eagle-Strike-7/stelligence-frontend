import { Button, Tooltip } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import { HiOutlinePencil } from 'react-icons/hi';

const RightNav = () => {
  return (
    <div className="flex mr-20 w-40 justify-end place-items-center">
      <div className="inline mr-4">
        <Link href="/newStar">
          <Button
            leftIcon={<HiOutlinePencil size="20px" />}
            variant="ghost"
            textColor="white"
            _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
            cursor="pointer"
            size="sm"
            rounded="sm"
          >
            <h2 className="text-md text-semibold">별생성</h2>
          </Button>
        </Link>
      </div>
      <div>
        <Tooltip
          hasArrow
          defaultIsOpen
          arrowSize={10}
          label="우주로 출발하기🚀"
          placement="right"
          color="black"
          backgroundColor="#f6f6f6"
          size="lg"
          padding="0.25rem 0.75rem"
          rounded="sm"
        >
          <Link href="/login">
            <AiOutlineLogin className="w-6 h-6" />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default RightNav;
