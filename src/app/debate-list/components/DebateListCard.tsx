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
      mb="1rem"
      width="full"
      variant="elevated"
      bg="rgba(118, 147, 231,0.1)"
      color="white"
      rounded="md"
      padding={4}
      justify="space-between"
      border={2}
      borderColor="primary.500"
      direction={{ base: 'column', sm: 'row' }}
      _hover={{
        bg: 'rgba(118, 147, 231, 0.22)',
        cursor: 'pointer',
      }}
    >
      <div>
        <h2 className="text-sm text-gray-400 mb-1">{originalTitle}</h2>
        <h2 className="text-md font-semibold mb-1">{title}</h2>
        <div className="flex items-center mb-1">
          <p className="mr-3 text-xs">{username}</p>
          <p className="text-xs" color="gray">
            {time}
          </p>
        </div>
      </div>
      <div className="justify-between">
        <div className="flex">
          <AiOutlineComment size="1.2rem" />
          <p className="text-sm">{option.commentNum}</p>
        </div>
      </div>
    </Card>
  );
};

export default DebateListCard;
