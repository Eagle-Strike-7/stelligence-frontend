'use client';

import React, { useEffect, useState } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import { usePathname } from 'next/navigation';
import PageTitleDescription from '@/components/Common/PageTitleDescription';
import { getCommentList } from '@/service/debate/comment';
import { Debate, getDebateData } from './page.server';
import CommentCreate from './components/Comment/CommentCreate';
import ReturnToDebateList from '../components/ReturnToDebateList';
import DebateDetail from './components/DebateDetail';
import NewReviseRequestButton from './components/NewReviseRequest';
import CommentsSection from './components/Comment/CommentsSection';

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
      <div className="w-max">
        {debateData?.status === 'OPEN' ? (
          <PageTitleDescription
            title="토론하기"
            description="토론에 참여해보세요"
            relatedDebateId={debateData.contribute.relatedDebateId}
          />
        ) : (
          <PageTitleDescription
            title="토론결과"
            description="종료된 토론의 결과를 확인하세요."
            relatedDebateId={debateData?.contribute.relatedDebateId}
          />
        )}
      </div>
      {isNewReviseRequested ? (
        ''
      ) : (
        <NewReviseRequestButton
          debateId={debateId}
          starId={debateData?.contribute.documentId}
          setIsNewReviseRequested={setIsNewReviseRequested}
        />
      )}
      <DebateDetail debateData={debateData} />
      <>
        <CommentsSection
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
      </>
    </Wrapper>
  );
};

export default Page;
