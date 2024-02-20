'use client';

import React, { useEffect } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import { useRecoilValue } from 'recoil';
import { loginState } from '@/store/user/login';
import { useRouter } from 'next/navigation';
import NewStarForm from './components/NewStarForm';
import LoadingComponent from '../(home)/components/LoadingComponent';

// NOTE : 새 글쓰기 페이지
const Page = () => {
  const login = useRecoilValue(loginState);
  const router = useRouter();

  useEffect(() => {
    if (!login.isLoading && !login.isLoggedIn) {
      router.push('/login');
    }
  }, [login, router]);

  if (login.isLoading) {
    return <LoadingComponent />;
  }
  return (
    <Wrapper>
      <NewStarForm />
    </Wrapper>
  );
};

export default Page;
