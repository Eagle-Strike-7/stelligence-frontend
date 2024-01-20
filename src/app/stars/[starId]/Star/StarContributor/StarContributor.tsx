import React from 'react';
import { Tag } from '@chakra-ui/react';

// FIXME : 기능 구현 시 삭제 예정
const StarContributorList = [
    {
        id: 1,
        name: '기여자1',
    },
    {
        id: 2,
        name: '기여자2',
    },
    {
        id: 3,
        name: '기여자3',
    },
];

// FIXME : 글의 기여자를 보여주는 컴포넌트
const StarContributor = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="text-lg font-bold align-middle mb-5">
                이 글에 참여한 사람
            </div>
            <div className="flex flex-row mb-3">
                <span className="text-lg align-middle">최초 작성자</span>
                <Tag
                    ml="0.5rem"
                    h="2rem"
                    colorScheme="blue"
                    variant="subtle"
                    size="lg"
                    fontSize="sm"
                    fontWeight="extrabold"
                >
                    내가 작성자다
                </Tag>
            </div>
            <div className="flex flex-row mb-14">
                <span className="text-lg align-middle mt-0.5">기여자</span>
                <div className="flex flex-row flex-wrap">
                    {StarContributorList.map(contributor => {
                        return (
                            <Tag
                                key={contributor.id}
                                ml="0.5rem"
                                h="2rem"
                                colorScheme="gray"
                                variant="subtle"
                                size="lg"
                                fontSize="sm"
                                fontWeight="extrabold"
                            >
                                {contributor.name}
                            </Tag>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default StarContributor;
