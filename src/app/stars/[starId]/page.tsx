'use client';

import React, { useEffect, useState } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import { Box } from '@chakra-ui/react';
import { StarResponseType } from '@/types/common/ResponseType';
import { DocStatus, Star, StarContributor } from '@/types/star/StarProps';
import { usePathname } from 'next/navigation';
import apiClient from '@/service/login/axiosClient';
import StarInfo from './components/StarInfo';
import StarContent from './components/StarContent';
import StarAuthors from './components/StarAuthors';
import formatDate from '../../../lib/formatDate';

// NOTE : 특정 글 상세보기 페이지
// TODO : 편집중 여부 표시, revision
const Page = () => {
  const [starRevision, setStarRevision] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [parentDocumentTitle, setParentDocumentTitle] = useState('');
  const [lastModifiedAt, setLastModifiedAt] = useState('');
  const [content, setContent] = useState('');
  const [originalAuthor, setOriginalAuthor] = useState<string>('');
  const [contributors, setContributors] = useState<StarContributor[]>([]);
  const [documentStatus, setDocumentStatus] = useState<DocStatus>(
    DocStatus.EDITABLE,
  );
  const [id, setId] = useState({
    contributeId: 0,
    debateId: 0,
  });

  const pathname = usePathname();
  const documentId = Number(pathname.split('/').pop());

  let params = {};

  // FIXME : revision 로컬 스토리지 저장 시 수정예정
  if (starRevision && starRevision !== 0) {
    params = { params: { revision: starRevision } };
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
        setDocumentStatus(data.results.documentStatus);
        setId({
          contributeId: data.results.contributeId,
          debateId: data.results.debateId,
        });
      }
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const revision = Number(localStorage.getItem('revision'));
    setStarRevision(revision);
    getStar();
  }, []);

  return (
    <Wrapper>
      <Box className="flex w-full flex-col">
        <StarInfo
          title={title}
          parentDocumentTitle={parentDocumentTitle}
          lastModifiedAt={lastModifiedAt}
          documentStatus={documentStatus}
          id={id}
        />
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
