import { Card } from '@chakra-ui/react';
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
      display="flex"
      marginY="1rem"
      width="full"
      rounded="md"
      padding={4}
      justify="space-between"
      border={2}
      borderColor="black"
      colorScheme="blue"
      direction={{ base: 'column', sm: 'row' }}
      bg="gray.50"
    >
      <div>
        <h2 className="text-md text-gray-400">{originalTitle}</h2>
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <div className="flex items-center mb-1">
          <p className="mr-3 text-sm">{username}</p>
          <p className="text-sm" color="gray">
            {time}
          </p>
        </div>
      </div>
      <div className="justify-between">
        <div className="flex">
          <AiOutlineComment size="1.5rem" />
          <p>{option.commentNum}</p>
        </div>
      </div>
    </Card>
  );
};

export default DebateListCard;
