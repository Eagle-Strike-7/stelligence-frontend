import { Card, Text } from '@chakra-ui/react';
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
      display="flex"
      marginY="1rem"
      width="full"
      rounded="md"
      padding="1rem"
      justify="space-between"
      border={2}
      borderColor="black"
      colorScheme="blue"
      direction={{ base: 'column', sm: 'row' }}
      bg="gray.50"
    >
      <div>
        <Text fontSize="lg" fontWeight={600} marginBottom={1}>
          {title}
        </Text>
        <div className="flex items-center mb-1">
          <Text marginRight={3} fontSize="sm">
            {username}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {time}
          </Text>
        </div>
        <Text className="text-md">{content}</Text>
      </div>
      <div className="justify-between">
        <LikeDislike likeNum={option.likeNum} dislikeNum={option.dislikeNum} />
      </div>
    </Card>
  );
};

export default SpecificVoteListCard;
