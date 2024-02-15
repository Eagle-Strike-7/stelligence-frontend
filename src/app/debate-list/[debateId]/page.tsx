'use client';

import React, { useEffect, useState } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import { usePathname } from 'next/navigation';

import PageTitleDescription from '@/components/Common/Title/PageTitleDescription';
import { getCommentList } from '@/service/debate/comment';
import getDocumentReviseState from '@/service/debate/reviseAuth';
import NewReviseRequestButton from './components/NewReviseRequestButton';
import DebateDetail from './components/DebateDetail/DebateDetail';
import CommentsSection from './components/Comments/CommentsSection';
import CreateComment from './components/Comments/CreateComment/CreateComment';
import BackToDebateListButton from './components/BackToDebateListButton';

import { Debate, getDebateData } from './page.server';

const Page = () => {
  const pathname = usePathname();
  const debateId = Number(pathname.split('/').pop());
  const [debateData, setDebateData] = useState<Debate | null>(null);
  const [commentsUpdated, setCommentsUpdated] = useState(false);
  // TODO 수정 가능한 유저인지, 수정 가능한 상태인지 확인하는 로직 필요
  const [reviseAuthUsers, setReviseAuthUsers] = useState<string[]>([]);
  const [isRevisableDoc, setIsRevisableDoc] = useState<boolean>(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string>('');
  const [commentIds, setCommentIds] = useState<number[]>([]);
  const isDebateClosed = debateData?.status === 'CLOSED';
  const [canRequestRevise, setCanRequestRevise] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>('');

  useEffect(() => {
    if (debateId) {
      getDebateData(debateId).then(setDebateData);
      getCommentList(debateId).then(comments => {
        setCommentIds(
          comments.map(item => {
            return item.commentId;
          }),
        );
        setReviseAuthUsers(
          comments.map(item => {
            return item.commenter.nickname;
          }),
        );
      });
      getDocumentReviseState(debateData?.contribute.documentId).then(
        response => {
          setIsRevisableDoc(response?.documentStatus === 'EDITABLE');
        },
      );
      if (isRevisableDoc && reviseAuthUsers.includes(currentUser)) {
        setCanRequestRevise(true);
      } else {
        setCanRequestRevise(false);
      }
      setCurrentUser('1');
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
    <Wrapper>
      <BackToDebateListButton />
      <div className="w-max">
        <PageTitleDescription
          title={debateData?.status === 'OPEN' ? '토론하기' : '토론결과'}
          description={
            debateData?.status === 'OPEN'
              ? '토론에 참여해보세요'
              : '종료된 토론의 결과를 확인하세요.'
          }
          relatedDebateId={debateData?.contribute.relatedDebateId}
        />
      </div>
      {isDebateClosed && canRequestRevise && (
        <NewReviseRequestButton
          debateId={debateId}
          starId={debateData?.contribute.documentId}
        />
      )}
      <DebateDetail debateData={debateData} />
      <CommentsSection
        debateId={debateId}
        commentIds={commentIds}
        commentsUpdated={commentsUpdated}
        handleClickCommentId={handleClickCommentId}
      />
      <CreateComment
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
