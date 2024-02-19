'use client';

import React from 'react';
import useRequireLogin from '@/hooks/common/useRequireLogin';
import Wrapper from '@/components/Common/Wrapper';
import ReviseStarForm from './components/ReviseStarForm';

// NOTE : 수정요청 페이지
const Page = () => {
  useRequireLogin();
  return (
    <Wrapper>
      <ReviseStarForm />
    </Wrapper>
  );
};

export default Page;
