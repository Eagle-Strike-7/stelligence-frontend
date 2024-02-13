'use client';

import React, { useEffect, useState } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import { usePathname } from 'next/navigation';
import PageTitleDescription from '@/components/Common/PageTitleDescription';
import { Tooltip } from '@chakra-ui/react';
import { getCommentList } from '@/service/debate/comment';
import { Debate, getDebateData } from './page.server';
import CommentList from './components/Comment/CommentList';
import CommentCreate from './components/Comment/CommentCreate';
import ReturnToDebateList from '../components/ReturnToDebateList';
import DebateDetail from './components/DebateDetail';
import NewReviseRequest from './components/NewReviseRequest';

const Page = () => {
  const pathname = usePathname();
  const debateId = Number(pathname.split('/').pop());
  const [debateData, setDebateData] = useState<Debate | null>(null);
  const [commentsUpdated, setCommentsUpdated] = useState(false);
  // TODO 서버로부터 해당 정보 받도록 변경 필요(계속 유지되어야 하는 정보)
  const [isNewReviseRequested, setIsNewReviseRequested] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string>('');
  const [commentIds, setCommentIds] = useState<number[]>([]);

  useEffect(() => {
    if (debateId) {
      getDebateData(debateId).then(setDebateData);
      getCommentList(debateId).then(comments => {
        setCommentIds(
          comments.map(item => {
            return item.commentId;
          }),
        );
      });
    }
  }, [debateId]);

  const refreshComments = () => {
    setCommentsUpdated(prev => {
      return !prev;
    });
  };

  const handleClickCommentId = (e: React.MouseEvent<HTMLSpanElement>) => {
    setSelectedCommentId(e.currentTarget.id);
  };

  return (
    // TODO 페이지 컴포넌트 전체 리팩토링 필요
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
          {debateData?.status === 'OPEN' ? (
            <PageTitleDescription
              title="토론하기"
              description="토론에 참여해보세요"
            />
          ) : (
            <PageTitleDescription
              title="토론결과"
              description="종료된 토론의 결과를 확인하세요."
            />
          )}
        </div>
      </Tooltip>
      {isNewReviseRequested ? (
        ''
      ) : (
        <NewReviseRequest
          debateId={debateId}
          starId={debateData?.documentId}
          setIsNewReviseRequested={setIsNewReviseRequested}
        />
      )}
      <DebateDetail debateData={debateData} />
      <CommentList
        debateId={debateId}
        commentIds={commentIds}
        commentsUpdated={commentsUpdated}
        handleClickCommentId={handleClickCommentId}
      />
      <CommentCreate
        selectedCommentId={selectedCommentId}
        onCommentCreated={refreshComments}
        debateId={debateId}
        commentIds={commentIds}
        debateStatus={debateData?.status ?? 'OPEN'}
        handleClickCommentId={handleClickCommentId}
      />
    </Wrapper>
  );
};

export default Page;
