import PageTitle from '@/components/Common/PageTitle';
import StateTab from '@/components/Common/StateTab';
import DebateListCard from '@/app/debateList/DebateListCard';
import Wrapper from '@/components/Common/Wrapper';
import { dummyDebateList } from '@/constants/dummyData';
import React from 'react';
import { Pagination } from '@mui/material';
import { Center } from '@chakra-ui/react';

const page = () => {
    return (
        <Wrapper>
            <PageTitle pageTitle="토론" />
            <StateTab tab1="진행중" tab2="종료" />
            {dummyDebateList.map(item => {
                return (
                    <DebateListCard
                        key={item.id}
                        originalTitle={item.originalTitle}
                        title={item.title}
                        username={item.username}
                        time={item.time}
                        content={item.content}
                        option={{ commentNum: item.commentNum }}
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
