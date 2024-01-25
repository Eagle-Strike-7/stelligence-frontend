'use client';

import React from 'react';
import { Button } from '@chakra-ui/react';
import { RiKakaoTalkFill } from 'react-icons/ri';

const KakaoLogin = () => {
  const link = `http://localhost:8080/oauth2/authorization/kakao`;
  const handleClick = () => {
    window.location.href = link;
  };
  return (
    <Button
      colorScheme="kakao"
      size="lg"
      leftIcon={<RiKakaoTalkFill />}
      width="20rem"
      height="3rem"
      color="black"
      onClick={handleClick}
    >
      카카오로 로그인
    </Button>
  );
};

export default KakaoLogin;
