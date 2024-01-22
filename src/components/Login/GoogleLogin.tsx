'use client';

import React from 'react';
import { Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

const GoogleLogin = () => {
  const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
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
      borderColor="gray.300"
      onClick={handleClick}
    >
      구글로 로그인
    </Button>
  );
};

export default GoogleLogin;
