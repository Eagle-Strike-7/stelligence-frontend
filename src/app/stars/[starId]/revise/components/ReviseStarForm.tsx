'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apiClient from '@/service/login/axiosClient';
import { Heading, StarResponseType } from '@/types/common/ResponseType';
import { Star, StarSection } from '@/types/star/StarProps';
import StarTitleInput from '@/components/Common/Star/StarTitleInput';
import StarTagInput from '@/components/Common/Star/StarTagInput';
import SubmitButton from '@/components/Common/Button/SubmitButton';
import { Amendment } from '@/types/star/ReviseStarProps';
import PageTitleDescription from '@/components/Common/Title/PageTitleDescription';
import { ReviseDataResponse } from '@/service/vote/voteService';
import uuid from 'react-uuid';
import ReviseStarReason from './ReviseStarReason';
import ReviseStarSection from './ReviseStarSection';

export interface DictionaryProps {
  [key: number]: Amendment[];
}

interface RevisedStarProps {
  contributeTitle: string;
  contributeDescription: string;
  amendments: Amendment[];
  documentId: number;
  afterDocumentTitle: string;
  afterParentDocumentId: number | null;
  relatedDebateId: number | null;
}

// NOTE : 수정요청 패이지
const ReviseStarForm = () => {
  const documentId = Number(useParams().starId);
  const router = useRouter();

  const [contributeTitle, setContributeTitle] = useState<string>('');
  const [contributeDescription, setContributeDescription] =
    useState<string>('');
  const [amendments, setAmendments] = useState<Amendment[]>([]);
  const [afterDocumentTitle, setAfterDocumentTitle] = useState<string>('');
  const [afterParentDocumentId, setAfterParentDocumentId] = useState<
    number | null
  >(null);
  const [relatedDebateId, setRelatedDebateId] = useState<number | null>(null);
  const [afterParentDocumentTitle, setAfterParentDocumentTitle] =
    useState<string>('');
  const [sections, setSections] = useState<StarSection[]>([]);
  const [createAmendments, setCreateAmendments] = useState<DictionaryProps>({});
  const [existingAmendments, setExistingAmendments] = useState<DictionaryProps>(
    {},
  );

  // FIXME : getStarSection 분리
  const getStarSections = async () => {
    try {
      const response = await apiClient.get<StarResponseType<Star>>(
        `/api/documents/${documentId}`,
      );
      const { data } = response;
      if (data.success && data.results.documentId === documentId) {
        setAfterDocumentTitle(data.results.title);
        setAfterParentDocumentId(data.results.parentDocumentId);
        setAfterParentDocumentTitle(data.results.parentDocumentTitle);
        setSections([
          {
            // NOTE : 맨 앞 섹션 추가를 위한 임시 데이터
            sectionId: 0,
            revision: 0,
            heading: Heading.H1,
            title: '',
            content: '',
            creatingOrder: 0,
          },
          ...data.results.sections.map(section => {
            return {
              sectionId: section.sectionId,
              revision: section.revision,
              heading: section.heading,
              title: section.title,
              content: section.content,
              creatingOrder: 0,
            };
          }),
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // FIXME : postRevisedStar 분리
  const postRevisedStar = async (RevisedStar: RevisedStarProps) => {
    try {
      const response = await apiClient.post<ReviseDataResponse>(
        `/api/contributes`,
        RevisedStar,
      );
      const { data } = response;
      if (data.success) {
        const { contributeId } = data.results;
        router.push(`/vote-list/${contributeId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStarSections();
    if (localStorage.getItem('debateId') !== null) {
      setRelatedDebateId(Number(localStorage.getItem('debateId')));
      localStorage.removeItem('debateId');
    }
  }, []);

  // TODO : create 포함하기
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contributeTitle === '') {
      alert('수정 요청안 제목을 입력해주세요');
    } else if (contributeDescription === '') {
      alert('수정 요청 이유를 입력해주세요');
    } else if (amendments.length === 0) {
      alert('수정안을 입력해주세요');
    }

    // SECTION : 수정요청안 합치기
    const createdAmendments = Object.values(createAmendments);
    setAmendments(createdAmendments);
    console.log('createdAmendments', amendments);
    const UpdatedAmendments = Object.values(existingAmendments);
    UpdatedAmendments.forEach(amendment => {
      amendments.push(...amendment);
    });

    const RevisedStar = {
      contributeTitle,
      contributeDescription,
      amendments,
      documentId,
      afterDocumentTitle,
      afterParentDocumentId,
      relatedDebateId,
    };

    // TODO : 함수 정의
    postRevisedStar(RevisedStar);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full pt-5 px-32">
      <PageTitleDescription
        title="수정 요청하기"
        description="글을 수정해보세요"
        relatedDebateId={Number(localStorage.getItem('debateId'))}
      />
      {/* SECTION : 수정요청안 제목 */}
      <StarTitleInput
        inputTitle="수정 요청안 제목"
        title={contributeTitle}
        setTitle={setContributeTitle}
      />
      {/* SECTION : 수정요청 이유 */}
      <ReviseStarReason
        contributeDescription={contributeDescription}
        setContributeDescription={setContributeDescription}
      />

      {/* SECTION : 수정안 */}
      <h3 className="text-2xl text-white font-bold mt-12 mb-4">
        수정 요청안 작성
      </h3>
      {/* SECTION : 새로운 글 제목 */}
      <StarTitleInput
        inputTitle="새로운 글 제목"
        title={afterDocumentTitle}
        setTitle={setAfterDocumentTitle}
      />
      {/* SECTION : 새로운 상위 계층 태그 */}
      <StarTagInput
        inputTitle="새로운 상위 계층 태그"
        parentDocumentTitle={afterParentDocumentTitle}
        setParentDocumentId={setAfterParentDocumentId}
      />

      {/* SECTION : 수정요청 섹션 */}
      <div className="flex flex-col w-full my-16">
        {sections.map((section: StarSection) => {
          return (
            <ReviseStarSection // TODO : key값 변경
              key={uuid()}
              sections={sections}
              setSections={setSections}
              section={section}
              createAmendments={createAmendments}
              setCreateAmendments={setCreateAmendments}
              existingAmendments={existingAmendments}
              setExistingAmendments={setExistingAmendments}
            />
          );
        })}
      </div>

      <SubmitButton name="수정 요청하기" />
    </form>
  );
};

export default ReviseStarForm;
