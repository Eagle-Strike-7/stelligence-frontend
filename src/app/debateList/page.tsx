'use client';

import PageTitle from '@/components/Common/PageTitle';
import StateTab from '@/components/Common/StateTab';
import DebateListCard from '@/app/debateList/components/DebateListCard';
import Wrapper from '@/components/Common/Wrapper';
import { dummyDebateList } from '@/constants/dummyData';
import React, { useState } from 'react';
import { Pagination } from '@mui/material';
import { Center } from '@chakra-ui/react';
import Link from 'next/link';
import ChakraSelect from '@/components/Common/ChakraSelect';

const Page = () => {
  const [activeTab, setActiveTab] = useState<string>('진행중');
  const [selectedOption, setSelectedOption] = useState<string>('최신순');
  const options = [
    { value: '최신순', label: '최신순' },
    { value: '최근 댓글 순', label: '최근 댓글 순' },
  ];

  // activeTab에 따라서 다른 axios 호출

  // selectedOption 따라서 다른 axios 호출
  console.log(selectedOption);

  return (
    <Wrapper>
      <PageTitle pageTitle="토론" />
      <div className="flex justify-between w-full items-center">
        <StateTab
          tab1="진행중"
          tab2="완료"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <ChakraSelect options={options} setSelectedOption={setSelectedOption} />
      </div>
      {dummyDebateList.map(item => {
        return (
          <Link href={`/debateList/${item.id}`} key={item.id}>
            <DebateListCard
              originalTitle={item.originalTitle}
              title={item.title}
              username={item.username}
              time={item.time}
              content={item.content}
              option={{ commentNum: item.commentNum }}
            />
          </Link>
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
