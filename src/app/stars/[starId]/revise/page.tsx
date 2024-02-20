'use client';

import React, { useEffect } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import { useRecoilValue } from 'recoil';
import { loginState } from '@/store/user/login';
import { useRouter } from 'next/navigation';
import LoadingComponent from '@/app/(home)/components/LoadingComponent';
import ReviseStarForm from './components/ReviseStarForm';

// NOTE : 수정요청 페이지
const Page = () => {
  const login = useRecoilValue(loginState);
  const router = useRouter();

  useEffect(() => {
    if (!login.isLoading && !login.isLoggedIn) {
      router.push('/login');
    }
  }, [login, router]);

  // 로딩 중 UI 처리
  if (login.isLoading) {
    return <LoadingComponent />;
  }
  return (
    <Wrapper>
      <ReviseStarForm />
    </Wrapper>
  );
};

export default Page;
