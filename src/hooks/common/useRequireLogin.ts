import { loginState } from '@/store/user/login';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const useRequireLogin = () => {
  const [isLogin] = useRecoilState(loginState);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push('/login');
    }
  }, [isLogin, router]);

  return isLogin;
};

export default useRequireLogin;
