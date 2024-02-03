'use client';

import React from 'react';
import { Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

const GoogleLogin = () => {
  // NOTE 로그인 전용 서버로 연결 (추후 기존 서버로 변경 예정)
  const link = `${process.env.NEXT_PUBLIC_SERVER_URL}:8080/oauth2/authorization/google`;
  const handleClick = () => {
    window.location.href = link;
  };
  return (
    <Button
      colorScheme="white"
      size="lg"
      leftIcon={<FcGoogle />}
      width="20rem"
      height="3rem"
      color="black"
      border="1px"
      borderColor="gray.100"
      onClick={handleClick}
      bg="white"
    >
      구글로 로그인
    </Button>
  );
};

export default GoogleLogin;
