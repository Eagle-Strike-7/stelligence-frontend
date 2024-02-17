'use client';

import React, { useRef, useState } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import { usePathname } from 'next/navigation';
import PageTitleDescription from '@/components/Common/Title/PageTitleDescription';
import { getCommentList } from '@/service/debate/comment';
import {
  getDocumentReviseState,
  ReviseStateProps,
} from '@/service/debate/reviseAuth';
import { useQuery } from '@tanstack/react-query';
import { CommentProps } from '@/types/debate/comment';
import { useRecoilValue } from 'recoil';
import { loggedInUserState } from '@/store/user/login';
import NewReviseRequestButton from './components/NewReviseRequestButton';
import DebateDetail from './components/DebateDetail/DebateDetail';
import CommentsSection from './components/Comments/CommentsSection';
import CreateComment from './components/Comments/CreateComment/CreateComment';
import BackToDebateListButton from './components/BackToDebateListButton';
import { Debate, getDebateData } from './page.server';

const Page = () => {
  const pathname = usePathname();
  const debateId = Number(pathname.split('/').pop());
  const [commentsUpdated, setCommentsUpdated] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string>('');
  const currentUserInfo = useRecoilValue(loggedInUserState);
  const [selectedOption, setSelectedOption] = useState<string>('등록순');
  const commentsSectionRef = useRef<HTMLDivElement>(null);

  const { data: debateData } = useQuery<
    Debate,
    Error,
    Debate,
    [string, number]
  >({
    queryKey: ['debateData', debateId],
    queryFn: () => {
      return getDebateData(debateId);
    },
    enabled: !!debateId,
    staleTime: 10000000,
  });

  const { data: comments } = useQuery<
    CommentProps[],
    Error,
    CommentProps[],
    [string, number]
  >({
    queryKey: ['comments', debateId],
    queryFn: () => {
      return getCommentList(debateId);
    },
    enabled: !!debateId,
  });

  const { data: reviseAuthData } = useQuery<
    ReviseStateProps | undefined,
    Error,
    ReviseStateProps,
    [string, number | undefined]
  >({
    queryKey: ['reviseAuth', debateData?.contribute.documentId],
    queryFn: () => {
      const documentId = debateData?.contribute.documentId;
      if (!documentId) {
        // NOTE documentId가 없는 경우 즉시 종료하고 undefined를 반환
        return Promise.resolve(undefined);
      }
      return getDocumentReviseState(documentId);
    },
    enabled: !!debateData?.contribute.documentId,
  });

  const refreshComments = () => {
    setCommentsUpdated(prev => {return !prev});
    // 댓글 섹션으로 스크롤 이동
  };

  const scrollToTopComment = () => {
    if (commentsSectionRef.current) {
      commentsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleClickCommentId = (e: React.MouseEvent<HTMLSpanElement>) => {
    setSelectedCommentId(e.currentTarget.id);
  };

  const isDebateClosed = debateData?.status === 'CLOSED';
  const commentIds =
    comments?.map(comment => {
      return comment.commentId;
    }) || [];
  const reviseAuthUsersId =
    comments?.map(comment => {
      return comment.commenter.memberId;
    }) || [];
  const isRevisableDoc =
    reviseAuthData?.documentStatus === ('EDITABLE' || 'PENDING');
  const currentUserId = currentUserInfo.memberId;
  const canRequestRevise =
    isRevisableDoc && reviseAuthUsersId.includes(currentUserId);

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
          canRequestRevise={canRequestRevise}
        />
      )}
      {debateData && <DebateDetail debateData={debateData} />}
      <CommentsSection
        debateId={debateId}
        commentIds={commentIds}
        commentsUpdated={commentsUpdated}
        handleClickCommentId={handleClickCommentId}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        ref={commentsSectionRef}
      />
      <CreateComment
        selectedCommentId={selectedCommentId}
        onCommentCreated={refreshComments}
        debateId={debateId}
        commentIds={commentIds}
        debateStatus={debateData?.status ?? 'OPEN'}
        handleClickCommentId={handleClickCommentId}
        selectedOption={selectedOption}
        scrollToTopComment={scrollToTopComment}
      />
    </Wrapper>
  );
};

export default Page;
