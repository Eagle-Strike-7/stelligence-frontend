import PageTitle from '@/components/Common/PageTitle';
import StateTab from '@/components/Common/StateTab';
import DebateListCard from '@/app/debateList/components/DebateListCard';
import Wrapper from '@/components/Common/Wrapper';
import { dummyDebateList } from '@/constants/dummyData';
import React from 'react';
import { Pagination } from '@mui/material';
import { Center, Select } from '@chakra-ui/react';
import Link from 'next/link';

const Page = () => {
  return (
    <Wrapper>
      <PageTitle pageTitle="토론" />
      <div className="flex justify-between w-full items-center my-0">
        <StateTab tab1="진행중" tab2="완료" />
        <div className="flex my-0">
          <Select
            variant="filled"
            size="sm"
            rounded="md"
            borderColor="gray.200"
            borderWidth={1}
            focusBorderColor="gray.400"
            bg="white"
          >
            <option value="최신순">최신순</option>
            <option value="최근댓글순">최근댓글순</option>
          </Select>
        </div>
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
