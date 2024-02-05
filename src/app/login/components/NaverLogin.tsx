'use client';

import React from 'react';
import { Button } from '@chakra-ui/react';
import { SiNaver } from 'react-icons/si';

const NaverLogin = () => {
  // NOTE 로그인 전용 서버로 연결 (추후 기존 서버로 변경 예정)
  const link = `${process.env.NEXT_PUBLIC_SERVER_URL}:8080/oauth2/authorization/naver`;
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
