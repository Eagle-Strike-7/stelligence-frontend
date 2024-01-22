'use client';

import React from 'react';
import { Button } from '@chakra-ui/react';
import { RiKakaoTalkFill } from 'react-icons/ri';

const KakaoLogin = () => {
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
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
