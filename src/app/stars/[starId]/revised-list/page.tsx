'use client';

import VoteListCard from '@/app/vote-list/components/VoteListCard';
import NoList from '@/components/Common/NoList';
import StateTab from '@/components/Common/StateTab';
import PageTitleDescription from '@/components/Common/Title/PageTitleDescription';
import Wrapper from '@/components/Common/Wrapper';
import formatDate from '@/lib/formatDate';
import getSpecificReviseData, {
  SpecificReviseResponse,
} from '@/service/revise/reviseService';
import { Center } from '@chakra-ui/react';
import { Pagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const documentId = Number(useParams().starId);
  const [activeTab, setActiveTab] = useState<string>('반영 완료');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: specificReviseData } = useQuery<
    SpecificReviseResponse,
    AxiosError
  >({
    queryKey: ['revise', activeTab],
    queryFn: () => {
      return getSpecificReviseData({
        documentId,
        activeTab,
        page: currentPage - 1,
      });
    },
  });

  useEffect(() => {
    if (specificReviseData) {
      setTotalPages(Number(specificReviseData?.results.totalPages));
    }
  }, [specificReviseData]);

  const handlePagination = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  return (
    <Wrapper>
      <PageTitleDescription
        title="수정 요청 목록"
        description="이전 수정요청에 대해 확인해보세요!"
      />
      <StateTab
        tab1="반영 완료"
        tab2="미반영"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {specificReviseData?.results.contributes.length !== 0 ? (
        <div>
          {specificReviseData?.results.contributes.map(item => {
            return (
              <VoteListCard
                key={item.contributeId}
                documentTitle={item.documentTitle}
                contributeId={item.contributeId}
                contributeTitle={item.contributeTitle}
                contributorNickname={item.contributorNickname}
                createTime={formatDate(item.createdAt)}
                agreeCount={item.voteSummary.agreeCount}
                disagreeCount={item.voteSummary.disagreeCount}
                contributeStatus={item.contributeStatus}
              />
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
              onChange={handlePagination}
            />
          </Center>
        </div>
      ) : (
        <NoList
          title="목록이 없습니다 👽"
          description="수정요청을 작성해보세요!"
        />
      )}
    </Wrapper>
  );
};

export default Page;
