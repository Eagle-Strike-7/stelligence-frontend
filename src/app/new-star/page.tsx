'use client'

import React from 'react';
import useRequireLogin from '@/hooks/common/useRequireLogin';
import Wrapper from '@/components/Common/Wrapper';
import NewStarForm from './components/NewStarForm';

// NOTE : 새 글쓰기 페이지
const Page = () => {
  useRequireLogin();
  return (
    <Wrapper>
      <NewStarForm />
    </Wrapper>
  );
};

export default Page;
