'use client';

import PageTitle from '@/components/Common/PageTitle';
import StateTab from '@/components/Common/StateTab';
import DebateListCard from '@/app/debateList/components/DebateListCard';
import Wrapper from '@/components/Common/Wrapper';
import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { Center } from '@chakra-ui/react';
import Link from 'next/link';
import ChakraSelect from '@/components/Common/ChakraSelect';
import axios from 'axios';

interface Debate {
  debateId: number;
  createdAt: string;
  endAt: string;
  documentId: number;
  documentTitle: string;
  contributeId: number;
  contributeTitle: string;
  commentsCount: number;
  contributor: {
    memberId: number;
    nickname: string;
    profileImgUrl: string;
  };
}

interface ApiResponse {
  success: boolean;
  message: string;
  results: {
    debates: Debate[];
    totalPages: number;
  };
}

const Page = () => {
  const [activeTab, setActiveTab] = useState<string>('진행중');
  const [selectedOption, setSelectedOption] = useState<string>('최신순');
  const [debateLists, setDebateLists] = useState<Debate[]>([]);
  // TODO 추후 추가 예정
  // const [totalPages, setTotalPages] = useState<number>();
  const options = [
    { value: '최신순', label: '최신순' },
    { value: '최근 댓글 순', label: '최근 댓글 순' },
  ];

  // NOTE activeTab에 따라서 다른 axios 호출
  const getDebateLists = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/debates`,
        {
          params: {
            status: activeTab === '진행중' ? 'OPEN' : 'CLOSED',
            // sort: selectedOption === '최신순' ? 'latest' : 'recentComment',
          },
        },
      );

      if (response.data.success) {
        console.log('데이터 로딩 성공:', response.data.results);
        setDebateLists(response.data.results.debates);
        // TODO 추후 추가 예정
        // setTotalPages(response.data.results.totalPages);
      } else {
        console.log('서버로부터 실패 메시지:', response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios 에러 발생:', error.message);
      } else {
        console.log('알 수 없는 에러 발생:', error);
      }
    }
  };

  useEffect(() => {
    getDebateLists();
  }, [activeTab, selectedOption]);
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
      {debateLists.map(item => {
        return (
          <Link href={`/debateList/${item.debateId}`} key={item.debateId}>
            <DebateListCard
              originalTitle={item.documentTitle}
              title={item.documentTitle}
              username={item.contributor.nickname}
              time={`${item.createdAt}~${item.endAt}`}
              option={{ commentNum: item.commentsCount }}
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
