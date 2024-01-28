'use client';

import React from 'react';
import { Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

const GoogleLogin = () => {
  const link = `http://localhost:8080/oauth2/authorization/google`;
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
