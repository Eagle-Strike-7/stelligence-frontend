'use client';

import React, { useEffect, useState } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import { usePathname } from 'next/navigation';
import PageTitleDescription from '@/components/Common/PageTitleDescription';
import { Debate, getDebateData } from './page.server';
import CommentList from './components/Comment/CommentList';
import DebateDetail from './components/DebateDetail';
import CommentCreate from './components/Comment/CommentCreate';
import ReturnToDebateList from '../components/ReturnToDebateList';

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
      <PageTitleDescription
        title="토론하기"
        description="토론에 참여해보세요"
      />
      <DebateDetail debateData={debateData} />
      <CommentList debateId={debateId} commentsUpdated={commentsUpdated} />
      <CommentCreate onCommentCreated={refreshComments} debateId={debateId} />
    </Wrapper>
  );
};

export default Page;
