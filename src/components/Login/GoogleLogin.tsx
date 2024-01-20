import React from 'react';
import { Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

const GoogleLogin = () => {
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
    >
      구글로 로그인
    </Button>
  );
};

export default GoogleLogin;
