import { Box, Card, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { ListCardProps } from '@/types/star/ListCardProps';
import { LikeDislikeProps } from '@/types/common/LikeDislikeProps';
import LikeDislike from '../../../../components/Common/LikeDislike';

// FIXME - 추후에 ListCard 컴포넌트들 재사용성을 높인 구조로 고치기
const SpecificVoteListCard: React.FC<ListCardProps<LikeDislikeProps>> = ({
    title,
    username,
    time,
    content,
    option,
}) => {
    return (
        <Card
            className="flex border-2 w-full rounded-md my-2 p-4 justify-between"
            direction={{ base: 'column', sm: 'row' }}
            variant="outline"
        >
            <Box>
                <Heading className="text-lg font-semibold mb-1">
                    {title}
                </Heading>
                <Box className="flex items-center mb-1">
                    <Text className="mr-3 text-sm">{username}</Text>
                    <Text className="text-sm" color="gray">
                        {time}
                    </Text>
                </Box>
                <Text className="text-md">{content}</Text>
            </Box>
            <Box className="justify-between">
                <LikeDislike
                    likeNum={option.likeNum}
                    dislikeNum={option.dislikeNum}
                />
            </Box>
        </Card>
    );
};

export default SpecificVoteListCard;
