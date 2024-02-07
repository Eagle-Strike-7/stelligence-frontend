'use client';

import React, { useEffect, useState } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import { usePathname } from 'next/navigation';
import { Debate, getDebateData } from './page.server';
import CommentList from '../components/CommentList';
import DebateDetail from './components/DebateDetail';
import CommentCreate from '../components/CommentCreate';
import ReturnToDebateList from '../components/ReturnToDebateList';
import DebatePrevNextNav from '../components/DebatePrevNextNav';

const Page = () => {
  const pathname = usePathname();
  const debateId = Number(pathname.split('/').pop()); // Assuming debateId is the last segment
  const [debateData, setDebateData] = useState<Debate | null>(null);
  const [commentsUpdated, setCommentsUpdated] = useState(false);

  useEffect(() => {
    if (debateId) {
      getDebateData(debateId).then(setDebateData);
    }
  }, [debateId]);

  const refreshComments = () => {
    setCommentsUpdated(prev => {return !prev});
  };

  return (
    <Wrapper>
      <DebatePrevNextNav />
      <ReturnToDebateList />
      {/* FIXME 추후에 투표페이지와 공통 컴포넌트로 수정 필요 */}
      <DebateDetail debateData={debateData} />
      <CommentList debateId={debateId} commentsUpdated={commentsUpdated} />
      <CommentCreate onCommentCreated={refreshComments} debateId={debateId} />
    </Wrapper>
  );
};

export default Page;
