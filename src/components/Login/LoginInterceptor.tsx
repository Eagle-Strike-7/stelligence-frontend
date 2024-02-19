import apiClient from '@/service/login/axiosClient';
import { loginState } from '@/store/user/login';
import { useToast } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const LoginInterceptor = () => {
  const [isLogin] = useRecoilState(loginState);
  const toast = useToast();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const id = apiClient.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        // SECTION UnAuthorized: 로그인하지 않은 사용자가 접속했을 때
        if (!isLogin && error.response && error.response.status === 401) {
          toast({
            title: '로그인이 필요합니다',
            description: '우주로 출발해주세요🚀',
            status: 'warning',
            duration: 1000,
            isClosable: true,
          });
        }

        return Promise.reject(error);
      },
    );

    return () => {
      apiClient.interceptors.response.eject(id); // 컴포넌트 언마운트 시 인터셉터 제거
    };
  }, [toast, router, pathname]);

  return null;
};

export default LoginInterceptor;
