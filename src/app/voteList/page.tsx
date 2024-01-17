import PageTitle from '@/components/Common/PageTitle';
import StateTab from '@/components/Common/StateTab';
import VoteListCard from '@/app/voteList/VoteListCard';
import Wrapper from '@/components/Common/Wrapper';
import { dummyVoteList } from '@/constants/dummyData';
import { Box, Center, Select } from '@chakra-ui/react';
import { Pagination } from '@mui/material';
import React from 'react';

const page = () => {
    return (
        <Wrapper>
            <PageTitle pageTitle="투표" />
            <Box className="flex justify-between w-full items-center">
                <StateTab tab1="진행중" tab2="완료" />
                <Box>
                    <Select
                        variant="outline"
                        size="lg"
                        className="bg-gray-100 rounded-md p-1"
                    >
                        <option value="전체">전체</option>
                        <option value="반영완료">반영완료</option>
                        <option value="진행중인 토론">진행중인 토론</option>
                        <option value="종료된 토론">종료된 토론</option>
                    </Select>
                </Box>
            </Box>
            {dummyVoteList.map(item => {
                return (
                    <VoteListCard
                        key={item.id}
                        originalTitle={item.originalTitle}
                        title={item.title}
                        username={item.username}
                        time={item.time}
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

export default page;
