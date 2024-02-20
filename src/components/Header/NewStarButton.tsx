import { loginState } from '@/store/user/login';
import { Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiOutlinePencil } from 'react-icons/hi';
import { useRecoilValue } from 'recoil';

const NewStarButton = () => {
  const isLogin = useRecoilValue(loginState);
  const toast = useToast();
  const router = useRouter();
  const handleCheckLogin = () => {
    if (!isLogin.isLoggedIn) {
      toast({
        title: '로그인이 필요합니다.',
        duration: 2000,
        isClosable: true,
        status: 'warning',
      });
      router.push('/login');
    } else {
      router.push('/new-star');
    }
  };
  return (
    <Button
      leftIcon={<HiOutlinePencil size="20px" />}
      variant="ghost"
      textColor="white"
      _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
      cursor="pointer"
      size="sm"
      rounded="sm"
      justifyContent="flex-start"
      onClick={handleCheckLogin}
    >
      <h2 className="text-md text-semibold">별생성</h2>
    </Button>
  );
};

export default NewStarButton;
