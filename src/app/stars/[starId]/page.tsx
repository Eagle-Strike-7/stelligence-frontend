'use client';

import React, { useEffect, useState } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import { Box } from '@chakra-ui/react';
import { StarResponseType } from '@/types/common/ResponseType';
import { Star, StarContributor } from '@/types/star/StarProps';
import { usePathname } from 'next/navigation';
import apiClient from '@/service/login/axiosClient';
import StarInfo from './components/StarInfo';
import StarContent from './components/StarContent';
import StarAuthors from './components/StarAuthors';

// NOTE : 특정 글 상세보기 페이지
// TODO : 편집중 여부 표시, 태그 id
const Page = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [originalAuthor, setOriginalAuthor] = useState<string>('');
  const [contributors, setContributors] = useState<string[]>([]);
  const pathname = usePathname();
  const documentId = pathname.split('/').pop();

  const getStar = async () => {
    try {
      const response = await apiClient.get<StarResponseType<Star>>(
        `/api/documents/${documentId}`,
      );
      const { data } = response;
      console.log('data', data); // FIXME : 기능완성 시 삭제예정
      if (data.success) {
        // TODO : && data.results.documentId === documentId
        setTitle(data.results.title);
        setContent(data.results.content);
        setOriginalAuthor(data.results.originalAuthor.nickname);
        setContributors(
          data.results.contributors.map((contributor: StarContributor) => {
            return contributor.nickname;
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
        <StarInfo title={title} />
        <StarContent content={content} />
        <StarAuthors
          originalAuthor={originalAuthor}
          contributors={contributors}
        />
      </Box>
    </Wrapper>
  );
};

export default Page;
