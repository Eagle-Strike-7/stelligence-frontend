'use client';

import React, { useEffect, useState } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import PageTitleDescription from '@/components/Common/Title/PageTitleDescription';
import { useQuery } from '@tanstack/react-query';
import getDocumentMaxVesrion from '@/service/history/getDocumentMaxVesrion';
import { usePathname } from 'next/navigation';
import HistoryTimeline from './HistoryTimeline';

const Page = () => {
  const pathname = usePathname();
  const [maxVersionNum, setMaxVersionNum] = useState<number>(0);
  const [title, setTitle] = useState<string>('');

  // NOTE starId 추출
  const documentId = Number(pathname.split('/')[2]);

  const { data } = useQuery({
    queryKey: ['document', documentId],
    queryFn: () => {
      return getDocumentMaxVesrion(documentId.toString());
    },
  });

  useEffect(() => {
    if (data) {
      setMaxVersionNum(data.latestRevision);
      setTitle(data.title);
    }
  }, [data]);

  return (
    <Wrapper>
      <PageTitleDescription
        title={title}
        description={`${title}의 역사를 버전별로 확인하세요`}
      />
      <HistoryTimeline maxVersionNum={maxVersionNum} />
    </Wrapper>
  );
};

export default Page;
