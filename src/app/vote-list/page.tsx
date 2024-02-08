'use client';

import PageTitle from '@/components/Common/PageTitle';
import StateTab from '@/components/Common/StateTab';
import VoteListCard from '@/app/vote-list/components/VoteListCard';
import Wrapper from '@/components/Common/Wrapper';
import { Center, Select } from '@chakra-ui/react';
import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import apiClient from '@/service/login/axiosClient';

interface ContributeData {
  contributeId: number;
  contributeTitle: string;
  contributeDescription: string;
  contributeStatus: 'VOTING';
  documentId: number;
  documentTitle: string;
  contributorId: number;
  contributorNickname: string;
  createdAt: string;
  agreeCount: number;
  disagreeCount: number;
}
interface VoteListResponse {
  success: boolean;
  message: string;
  results: {
    contributes: ContributeData[];
    totalPages: number;
    totalElements: number;
    size: number;
    currentPage: number;
    firstPage: boolean;
    lastPage: boolean;
  };
}

const Page = () => {
  const [activeTab, setActiveTab] = useState<string>('진행중');
  const [voteList, setVoteList] = useState<ContributeData[]>([]);
  // NOTE 투표 완료 목록 필터링
  const [selected, setSelected] = useState<string>('');
  // NOTE 페이지네이션
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // NOTE 투표 상태
  const options = [
    { id: 'all', value: '', label: '전체' },
    { id: 'rejected', value: 'REJECTED', label: '미반영' },
    { id: 'debating', value: 'DEBATING', label: '토론' },
    { id: 'merged', value: 'MERGED', label: '반영완료' },
  ];

  // NOTE 투표 목록 조회
  const getVoteList = async () => {
    const url =
      activeTab === '진행중'
        ? 'api/contributes/voting'
        : 'api/contributes/complete';
    const params =
      activeTab === '진행중'
        ? { page: currentPage - 1 }
        : { status: selected, page: currentPage - 1 };
    try {
      const response = await apiClient.get<VoteListResponse>(url, {
        params,
      });

      if (response.data.success) {
        console.log('투표 목록 조회 성공', response.data.results, activeTab);
        setVoteList(response.data.results.contributes);
        setTotalPages(response.data.results.totalPages);
      }
    } catch (error) {
      console.error('투표 목록 조회 실패: ', error);
    }
  };

  const handlePagination = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
    setCurrentPage(1);
  };

  const convertDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${year}. ${month}. ${day}. ${hour}:${minute}`;
  };

  useEffect(() => {
    getVoteList();
  }, [activeTab, selected, currentPage]);

  return (
    <Wrapper>
      <PageTitle pageTitle="투표" />
      <div className="flex justify-between w-full items-center my-0">
        <StateTab
          tab1="진행중"
          tab2="완료"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="flex my-0">
          {activeTab === '완료' && (
            <Select
              variant="outline"
              size="sm"
              rounded="md"
              onChange={handleSelectStatus}
            >
              {options.map(option => {
                return (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </Select>
          )}
        </div>
      </div>
      {voteList &&
        voteList.map(item => {
          return (
            <VoteListCard
              key={item.contributeId}
              documentTitle={item.documentTitle}
              contributeId={item.contributeId}
              contributeTitle={item.contributeTitle}
              contributorNickname={item.contributorNickname}
              createTime={item.createdAt || convertDate(new Date())}
              agreeCount={item.agreeCount || 10}
              disagreeCount={item.disagreeCount || 20}
              contributeStatus={item.contributeStatus}
            />
          );
        })}
      <Center>
        <Pagination
          count={totalPages}
          className="my-10 mb-20"
          onChange={handlePagination}
        />
      </Center>
    </Wrapper>
  );
};

export default Page;
