'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import apiClient from '@/service/login/axiosClient';
import { StarResponseType } from '@/types/common/ResponseType';
import { Star, StarSection } from '@/types/star/StarProps';
import StarTitleInput from '@/components/Common/Star/StarTitleInput';
import StarTagInput from '@/components/Common/Star/StarTagInput';
import SubmitButton from '@/components/Common/Button/SubmitButton';
import { Amendment } from '@/types/star/ReviseStarProps';
import PageTitleDescription from '@/components/Common/Title/PageTitleDescription';
import ReviseStarReason from './ReviseStarReason';
import ReviseStarSection from './ReviseStarSection';

// NOTE : 수정요청 패이지
// FIXME : relatedDebateId 추가
const ReviseStarForm = () => {
  const documentId = Number(useParams().starId);

  const [contributeTitle, setContributeTitle] = useState<string>('');
  const [contributeDescription, setContributeDescription] =
    useState<string>('');
  const [amendments, setAmendments] = useState<Amendment[]>([]);
  const [afterDocumentTitle, setAfterDocumentTitle] = useState<string>('');
  const [afterParentDocumentId, setAfterParentDocumentId] = useState<
    number | null
  >(0);
  const [afterParentDocumentTitle, setAfterParentDocumentTitle] =
    useState<string>('');
  const [sections, setSections] = useState<StarSection[]>([]);

  const addAmendment = (newAmendment: Amendment) => {
    setAmendments(currentAmendments => {
      return [...currentAmendments, newAmendment];
    });
  };

  // FIXME : getStarSection 분리
  const getStarSections = async () => {
    try {
      const response = await apiClient.get<StarResponseType<Star>>(
        `/api/documents/${documentId}`,
      );
      const { data } = response;
      console.log('data', data); // FIXME : 기능완성 시 삭제예정
      if (data.success && data.results.documentId === documentId) {
        setAfterDocumentTitle(data.results.title);
        setAfterParentDocumentId(data.results.parentDocumentId);
        setAfterParentDocumentTitle(data.results.parentDocumentTitle);
        setSections(
          data.results.sections.map(section => {
            return {
              sectionId: section.sectionId,
              revision: section.revision,
              heading: section.heading,
              title: section.title,
              content: section.content,
              creatingOrder: 0,
            };
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStarSections();
  }, []);

  useEffect(() => {
    console.log(amendments);
  }, [amendments]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const RevisedStar = {
      contributeTitle,
      contributeDescription,
      amendments,
      documentId,
      afterDocumentTitle,
      afterParentDocumentId,
    };
    // @ts-ignore
    // TODO : 함수 정의
    postReviseStar(RevisedStar);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full pt-5 px-32">
      <PageTitleDescription
        title="수정 요청하기"
        description="글을 수정해보세요"
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
            <ReviseStarSection
              key={`${section.sectionId}-${section.creatingOrder}`}
              sections={sections}
              setSections={setSections}
              section={section}
              addAmendment={addAmendment}
            />
          );
        })}
      </div>

      <SubmitButton name="수정 요청하기" />
    </form>
  );
};

export default ReviseStarForm;
