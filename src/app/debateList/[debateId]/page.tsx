'use client';

import Wrapper from '@/components/Common/Wrapper';
import React from 'react';
import CommentList from '../components/CommentList';
import PagePreview from '../components/PagePreview';
import WriteComment from '../components/CreateComment';
import RouteToList from '../components/RouteToList';

const page = () => {
  return (
    <Wrapper>
      <WriteComment />
      <CommentList />
      <PagePreview />
      <RouteToList />
    </Wrapper>
  );
};

export default page;
