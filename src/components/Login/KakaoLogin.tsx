import React from 'react';
import { Button } from '@chakra-ui/react';
import { RiKakaoTalkFill } from 'react-icons/ri';

const KakaoLogin = () => {
  return (
    <Button
      colorScheme="kakao"
      size="lg"
      leftIcon={<RiKakaoTalkFill />}
      width="20rem"
      height="3rem"
      color="black"
    >
      카카오로 로그인
    </Button>
  );
};

export default KakaoLogin;
