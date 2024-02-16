'use client';

import React, { useEffect, useState } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import { Box, Stack } from '@chakra-ui/react';
import { StarResponseType } from '@/types/common/ResponseType';
import { Star, StarContributor } from '@/types/star/StarProps';
import { useParams, useSearchParams } from 'next/navigation';
import apiClient from '@/service/login/axiosClient';
import StarInfo from './components/StarInfo';
import StarContent from './components/StarContent';
import StarAuthors from './components/StarAuthors';
import formatDate from '../../../lib/formatDate';

// NOTE : 특정 글 상세보기 페이지
// TODO : 편집중 여부 표시, revision
const Page = () => {
  const [title, setTitle] = useState('');
  const [parentDocumentTitle, setParentDocumentTitle] = useState('');
  const [parentDocumentId, setParentDocumentId] = useState<number>(0);
  const [lastModifiedAt, setLastModifiedAt] = useState('');
  const [content, setContent] = useState('');
  const [originalAuthor, setOriginalAuthor] = useState<string>('');
  const [currentRevision, setCurrentRevision] = useState<number>(0);
  const [latestRevision, setLatestRevision] = useState<number>(0);
  const [contributors, setContributors] = useState<StarContributor[]>([]);

  const documentId = Number(useParams().starId);
  const searchParams = useSearchParams();

  let params = {};
  if (searchParams.has('revision')) {
    params = { revision: searchParams.get('revision') };
  }

  const getStar = async () => {
    // TODO : getStar 분리
    try {
      const response = await apiClient.get<StarResponseType<Star>>(
        `/api/documents/${documentId}`,
        { params },
      );
      const { data } = response;
      console.log(data);
      if (data.success && data.results.documentId === documentId) {
        setTitle(data.results.title);
        setParentDocumentTitle(data.results.parentDocumentTitle);
        setParentDocumentId(data.results.parentDocumentId);
        setLastModifiedAt(formatDate(data.results.lastModifiedAt));
        setContent(data.results.content);
        setOriginalAuthor(data.results.originalAuthor.nickname);
        setCurrentRevision(data.results.currentRevision);
        setLatestRevision(data.results.latestRevision);
        setContributors(
          data.results.contributors.map((contributor: StarContributor) => {
            return {
              memberId: contributor.memberId,
              nickname: contributor.nickname,
            };
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStar();
  }, []);

  return (
    <Wrapper>
      <Box className="flex w-full flex-col">
        <Stack spacing="6">
          <StarInfo
            title={title}
            parentDocumentTitle={parentDocumentTitle}
            parentDocumentId={parentDocumentId}
            lastModifiedAt={lastModifiedAt}
            currentRevision={currentRevision}
            latestRevision={latestRevision}
          />
          <StarContent content={content} />
          <StarAuthors
            originalAuthor={originalAuthor}
            contributors={contributors}
          />
        </Stack>
      </Box>
    </Wrapper>
  );
};

export default Page;
