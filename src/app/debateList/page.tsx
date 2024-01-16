import ListCard from '@/components/Common/ListCard';
import Wrapper from '@/components/Common/Wrapper';
import dummyDebateList from '@/constants/dummyData';
import React from 'react';

const page = () => {
    return (
        <Wrapper>
            {dummyDebateList.map(item => {
                return (
                    <ListCard
                        key={item.id}
                        title={item.title}
                        username={item.username}
                        time={item.time}
                        content={item.content}
                        likeNum={item.likeNum}
                        dislikeNum={item.dislikeNum}
                    />
                );
            })}
        </Wrapper>
    );
};

export default page;
