'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '@/store/user/login';

const useRequireLogin = () => {
  const isLogin = useRecoilValue(loginState);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push('/login');
    }
  }, [isLogin]);
};

export default useRequireLogin;
