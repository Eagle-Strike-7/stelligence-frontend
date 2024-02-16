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
  const [lastModifiedAt, setLastModifiedAt] = useState('');
  const [content, setContent] = useState('');
  const [originalAuthor, setOriginalAuthor] = useState<string>('');
  const [contributors, setContributors] = useState<StarContributor[]>([]);

  const documentId = Number(useParams().starId);
  const searchParams = useSearchParams();

  let params = {};
  if (searchParams.has('revision')) {
    params = { revision: searchParams.get('revision') };
    console.log('params', params); // FIXME : 기능완성 시 삭제예정
  }

  const getStar = async () => {
    // TODO : getStar 분리
    try {
      const response = await apiClient.get<StarResponseType<Star>>(
        `/api/documents/${documentId}`,
        { params },
      );
      const { data } = response;
      console.log('data', data); // FIXME : 기능완성 시 삭제예정
      if (data.success && data.results.documentId === documentId) {
        setTitle(data.results.title);
        setParentDocumentTitle(data.results.parentDocumentTitle);
        setLastModifiedAt(formatDate(data.results.lastModifiedAt));
        setContent(data.results.content);
        setOriginalAuthor(data.results.originalAuthor.nickname);
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
            lastModifiedAt={lastModifiedAt}
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
