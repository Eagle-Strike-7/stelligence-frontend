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
  const debateId = Number(pathname.split('/').pop());
  const [debateData, setDebateData] = useState<Debate | null>(null);
  const [commentsUpdated, setCommentsUpdated] = useState(false);

  useEffect(() => {
    if (debateId) {
      getDebateData(debateId).then(setDebateData);
    }
  }, [debateId]);

  const refreshComments = () => {
    setCommentsUpdated(prev => {
      return !prev;
    });
  };

  return (
    <Wrapper>
      <ReturnToDebateList />
      <DebatePrevNextNav />
      <h3 className="font-bold w-full text-left mb-5 text-3xl">토론하기</h3>
      <p>토론에 참여해보세요</p>
      {/* FIXME 추후에 투표페이지와 공통 컴포넌트로 수정 필요 */}
      <DebateDetail debateData={debateData} />
      <CommentList debateId={debateId} commentsUpdated={commentsUpdated} />
      <CommentCreate onCommentCreated={refreshComments} debateId={debateId} />
    </Wrapper>
  );
};

export default Page;
