import { Card } from '@chakra-ui/react';
import React from 'react';
import { ListCardProps } from '@/types/star/ListCardProps';
import { LikeDislikeProps } from '@/types/common/LikeDislikeProps';
import LikeDislike from '../../../components/Common/LikeDislike';

// FIXME - 추후에 ListCard 컴포넌트들 재사용성을 높인 구조로 고치기
const VoteListCard: React.FC<ListCardProps<LikeDislikeProps>> = ({
  originalTitle,
  title,
  username,
  time,
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
        <h2 className="text-md text-gray-400 mb-1">{originalTitle}</h2>
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <div className="flex place-items-center mb-1">
          <p className="text-sm mr-3">{username}</p>
          <p className="text-sm text-gray">{time}</p>
        </div>
      </div>
      <div className="justify-between">
        <LikeDislike likeNum={option.likeNum} dislikeNum={option.dislikeNum} />
      </div>
    </Card>
  );
};

export default VoteListCard;