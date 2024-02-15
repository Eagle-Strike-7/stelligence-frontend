'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Wrapper from '@/components/Common/Wrapper';
import PageTitle from '@/components/Common/Title/PageTitle';
import StateTab from '@/components/Common/StateTab';
import { dummyVoteList } from '@/constants/dummyData';
import SpecificVoteListCard from '@/app/stars/[starId]/voteList/components/SpecificVoteListCard';
import Pagination from '@mui/material/Pagination';
import { Center } from '@chakra-ui/react';

const Page: React.FC = () => {
  const params = useParams<{ starId: string }>();
  const id = params.starId;
  const [activeTab, setActiveTab] = useState<string>('요청중');

  return (
    <Wrapper>
      <PageTitle pageTitle="마리모" />
      <StateTab
        tab1="요청중"
        tab2="완료"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {dummyVoteList.map(item => {
        return (
          <SpecificVoteListCard
            key={id}
            title={item.title}
            username={item.username}
            time={item.time}
            content={item.content}
            option={{
              likeNum: item.likeNum,
              dislikeNum: item.dislikeNum,
            }}
          />
        );
      })}
      <Center>
        <Pagination
          count={10}
          showFirstButton
          showLastButton
          className="my-10 mb-20"
        />
      </Center>
    </Wrapper>
  );
};

export default Page;
