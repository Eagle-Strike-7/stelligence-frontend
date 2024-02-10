'use client';

import React, { useEffect, useState } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import { usePathname } from 'next/navigation';
import PageTitleDescription from '@/components/Common/PageTitleDescription';
import { Tooltip } from '@chakra-ui/react';
import { Debate, getDebateData } from './page.server';
import CommentList from './components/Comment/CommentList';
import CommentCreate from './components/Comment/CommentCreate';
import ReturnToDebateList from '../components/ReturnToDebateList';
import DebateDetail from './components/DebateDetail';

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
      <Tooltip
        hasArrow
        defaultIsOpen
        arrowSize={10}
        label="💬 연관 토론 : #11"
        placement="right-start"
        color="black"
        backgroundColor="#f6f6f6"
        size="lg"
        padding="0.25rem 0.75rem"
        mr="1.2rem "
        mt="0.2rem"
        rounded="sm"
      >
        <div className="w-max">
          <PageTitleDescription
            title="토론하기"
            description="토론에 참여해보세요"
          />
        </div>
      </Tooltip>
      <DebateDetail debateData={debateData} />
      <CommentList debateId={debateId} commentsUpdated={commentsUpdated} />
      <CommentCreate onCommentCreated={refreshComments} debateId={debateId} />
    </Wrapper>
  );
};

export default Page;
