'use client';

import React from 'react';
import { Button } from '@chakra-ui/react';
import { RiKakaoTalkFill } from 'react-icons/ri';

const KakaoLogin = () => {
  // NOTE 로그인 전용 서버로 연결 (추후 기존 서버로 변경 예정)
  const link = `${process.env.NEXT_PUBLIC_SERVER_URL}:8080/oauth2/authorization/kakao`;
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
