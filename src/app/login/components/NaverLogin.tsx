'use client';

import React from 'react';
import { Button } from '@chakra-ui/react';
import { SiNaver } from 'react-icons/si';

const NaverLogin = () => {
  const link = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&state=STATE_STRING&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}`;
  const handleClick = () => {
    window.location.href = link;
  };
  return (
    <Button
      colorScheme="naver"
      size="lg"
      leftIcon={<SiNaver />}
      width="20rem"
      height="3rem"
      color="white"
      onClick={handleClick}
    >
      네이버로 로그인
    </Button>
  );
};

export default NaverLogin;
