import { Tooltip } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { AiOutlineLogin } from 'react-icons/ai';

const Login = () => {
  return (
    <div className="flex mr-20 w-40 justify-end">
      <Tooltip
        hasArrow
        defaultIsOpen
        arrowSize={10}
        label="우주로 출발하기🚀"
        placement="left"
        color="black"
        backgroundColor="#f6f6f6"
        size="lg"
        padding="0.25rem 0.75rem"
        className="rounded-md"
      >
        <Link href="/login">
          <AiOutlineLogin className="w-6 h-6" />
        </Link>
      </Tooltip>
    </div>
  );
};

export default Login;
