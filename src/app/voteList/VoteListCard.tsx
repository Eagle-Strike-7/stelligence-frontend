import { Box, Card, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { ListCardProps } from '@/types/star/ListCardProps';
import { LikeDislikeProps } from '@/types/common/LikeDislikeProps';
import LikeDislike from '../../components/Common/LikeDislike';

const VoteListCard: React.FC<ListCardProps<LikeDislikeProps>> = ({
    originalTitle,
    title,
    username,
    time,
    option,
}) => {
    return (
        <Card
            className="flex border-2 w-full rounded-md my-2 p-4 justify-between"
            direction={{ base: 'column', sm: 'row' }}
            variant="outline"
        >
            <Box>
                <Text className="text-md text-gray-400">{originalTitle}</Text>
                <Heading className="text-lg font-semibold mb-1">
                    {title}
                </Heading>
                <Box className="flex items-center mb-1">
                    <Text className="mr-3 text-sm">{username}</Text>
                    <Text className="text-sm" color="gray">
                        {time}
                    </Text>
                </Box>
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

export default VoteListCard;
