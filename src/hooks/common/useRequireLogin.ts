import { getLoginStateLocalStorage } from '@/service/login/loginState';
import { loginState } from '@/store/user/login';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const useRequireLogin = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const loginStateLocalStorage = getLoginStateLocalStorage();
  const router = useRouter();

  useEffect(() => {
    setIsLogin(loginStateLocalStorage === 'true');
    if (!isLogin) {
      router.push('/login');
    }
  }, [isLogin, router]);

  return isLogin;
};

export default useRequireLogin;
