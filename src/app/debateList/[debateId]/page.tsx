'use client';

import React, { useEffect, useState } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import { usePathname } from 'next/navigation';
import { Debate, getDebateData } from './page.server';
import CommentList from '../components/CommentList';
import PagePreview from '../components/PagePreview';
import WriteComment from '../components/CreateComment';
import DebateDetail from './components/DebateDetail';
import RouteToList from '../components/RouteToList';

const Page = () => {
  const pathname = usePathname();
  const debateId = pathname.split('/').pop(); // Assuming debateId is the last segment
  const [debateData, setDebateData] = useState<Debate | null>(null);

  useEffect(() => {
    if (debateId) {
      getDebateData(debateId).then(setDebateData);
    }
  }, [debateId]);

  return (
    <Wrapper>
      <PagePreview />
      <RouteToList />
      {/* FIXME 추후에 투표페이지와 공통 컴포넌트로 수정 필요 */}
      <DebateDetail debateData={debateData} />
      <CommentList />
      <CommentCreate />
    </Wrapper>
  );
};

export default Page;
