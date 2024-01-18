import { Box, Card, Text } from '@chakra-ui/react';
import React from 'react';
import { ListCardProps } from '@/types/star/ListCardProps';
import { AiOutlineComment } from 'react-icons/ai';

// FIXME - 추후에 ListCard 컴포넌트들 재사용성을 높인 구조로 고치기
const DebateListCard: React.FC<ListCardProps<{ commentNum: number }>> = ({
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
            <div>
                <Text className="text-md text-gray-400">{originalTitle}</Text>
                <Text className="text-lg font-semibold mb-1">{title}</Text>
                <div className="flex items-center mb-1">
                    <Text className="mr-3 text-sm">{username}</Text>
                    <Text className="text-sm" color="gray">
                        {time}
                    </Text>
                </div>
            </div>
            <div className="justify-between">
                <Box className="flex">
                    <AiOutlineComment size="1.5rem" />
                    <Text>{option.commentNum}</Text>
                </Box>
            </div>
        </Card>
    );
};

export default DebateListCard;
