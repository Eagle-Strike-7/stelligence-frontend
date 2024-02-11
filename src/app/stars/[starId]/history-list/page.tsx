'use client';

import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/Common/PageTitle';
import Wrapper from '@/components/Common/Wrapper';
import HistoryTimeline from './HistoryTimeline';

const Page = () => {
  const [maxVersionNum, setMaxVersionNum] = useState<number>(4);
  const title = '마리모의 역사';

  useEffect(() => {
    setMaxVersionNum(8);
  }, []);

  return (
    <Wrapper>
      <PageTitle pageTitle={title} />
      <HistoryTimeline maxVersionNum={maxVersionNum} />
    </Wrapper>
  );
};

export default Page;
