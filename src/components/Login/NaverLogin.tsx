import React from 'react';
import { Button } from '@chakra-ui/react';
import { SiNaver } from 'react-icons/si';

const NaverLogin = () => {
  return (
    <Button
      colorScheme="naver"
      size="lg"
      leftIcon={<SiNaver />}
      width="20rem"
      height="3rem"
      color="white"
    >
      네이버로 로그인
    </Button>
  );
};

export default NaverLogin;
