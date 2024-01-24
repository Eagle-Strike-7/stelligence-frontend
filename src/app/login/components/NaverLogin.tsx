'use client';

import React from 'react';
import { Button } from '@chakra-ui/react';
import { SiNaver } from 'react-icons/si';

const NaverLogin = () => {
  const link = `http://localhost:8080/oauth2/authorization/naver`;
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
