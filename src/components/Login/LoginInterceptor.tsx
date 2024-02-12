import apiClient from '@/service/login/axiosClient';
import { removeLoginStateLocalStorage } from '@/service/login/loginState';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginInterceptor = () => {
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const interceptorId = apiClient.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        // SECTION UnAuthorized: 로그인하지 않은 사용자가 접속했을 때
        if (error.response && error.response.status === 401) {
          removeLoginStateLocalStorage();
          toast({
            title: '로그인이 필요합니다',
            description: '다시 로그인 해주세요🚀',
            status: 'warning',
            duration: 1000,
            isClosable: true,
          });
          router.push('/login');
        }

        return Promise.reject(error);
      },
    );

    return () => {
      apiClient.interceptors.response.eject(interceptorId);
    };
  }, [router]);
  return null;
};

export default LoginInterceptor;
