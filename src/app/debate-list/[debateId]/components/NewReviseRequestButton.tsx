import React from 'react';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

const NewReviseRequestButton: React.FC<{
  debateId: number;
  starId: number | undefined;
}> = ({ debateId, starId }) => {
  return (
    <div className="flex text-center place-self-center justify-center mb-4 mt-[-1rem] ">
      <Link
      className='w-full'
        href={{
          pathname: `/stars/${starId}/revise`,
          query: { debateId },
        }}
      >
        <Button
          variant="solid"
          bg="primary.500"
          color="white"
          width="100%"
          _hover={{
            bg: 'rgba(118, 147, 231, 0.7)', // 'primary.500'에 해당하는 RGBA 값
            color: 'white',
            transition: 'background-color 0.5s ease',
          }}
          _focus={{
            boxShadow:
              '0 0 1px 2px rgba(88, 144, 255, 0.75), 0 1px 1px rgba(0, 0, 0, 0.15)',
          }}
        >
          새 수정 요청
        </Button>
      </Link>
    </div>
  );
};

export default NewReviseRequestButton;
