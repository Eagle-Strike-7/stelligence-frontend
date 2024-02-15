'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Pagination } from '@mui/material';
import { Center } from '@chakra-ui/react';
import Wrapper from '@/components/Common/Wrapper';
import PageTitle from '@/components/Common/PageTitle';
import StateTab from '@/components/Common/StateTab';
import ChakraSelect from '@/components/Common/ChakraSelect';
import DebateListCard from '@/app/debate-list/components/DebateListCard';
import apiClient from '@/service/login/axiosClient';

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
    isFirstPage: boolean;
    isLastPage: boolean;
  };
}

const Page = () => {
  const [activeTab, setActiveTab] = useState<string>('진행중');
  const [selectedOption, setSelectedOption] = useState<string>('최신순');
  const [debateLists, setDebateLists] = useState<Debate[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const options = [
    { value: '최신순', label: '최신순' },
    { value: '최근 댓글 순', label: '최근 댓글 순' },
  ];

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  // NOTE activeTab에 따라서 다른 axios 호출
  const getDebateLists = async () => {
    try {
      const response = await apiClient.get<ApiResponse>(`/api/debates`, {
        params: {
          status: activeTab === '진행중' ? 'OPEN' : 'CLOSED',
          order: selectedOption === '최신순' ? 'LATEST' : 'RECENT_COMMENTED',
          page: currentPage - 1,
        },
      });

      if (response.data.success) {
        console.log('데이터 로딩 성공:', response.data.results);
        setDebateLists(response.data.results.debates);
        setTotalPages(response.data.results.totalPages);
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
  }, [activeTab, selectedOption, currentPage]);

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
          <Link href={`/debate-list/${item.debateId}`} key={item.debateId}>
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
          count={totalPages}
          showFirstButton
          showLastButton
          className="my-10 mb-20"
          page={currentPage}
          color="primary"
          onChange={handlePageChange}
        />
      </Center>
    </Wrapper>
  );
};

export default Page;
