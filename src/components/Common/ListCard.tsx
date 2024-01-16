import { Box, Card, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { ListCardProps } from '@/types/ListCardProps';
import LikeDislike from './LikeDislike';

const ListCard: React.FC<ListCardProps> = ({
    title,
    username,
    time,
    content,
    likeNum,
    dislikeNum,
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
                <LikeDislike likeNum={likeNum} dislikeNum={dislikeNum} />
            </Box>
        </Card>
    );
};

export default ListCard;
