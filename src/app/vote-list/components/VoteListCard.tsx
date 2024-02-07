import { Badge, Card } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import LikeDislike from '../../../components/Common/LikeDislike';

interface VoteListCardProps {
  documentTitle: string;
  contributeId: number;
  contributeTitle: string;
  contributorNickname: string;
  createTime: string;
  agreeCount: number;
  disagreeCount: number;
  contributeStatus: string;
}

// TODO - ListCard 컴포넌트를 활용해 재사용성을 높인 구조로 리팩토링
const VoteListCard = ({
  documentTitle,
  contributeId,
  contributeTitle,
  contributorNickname,
  createTime,
  agreeCount,
  disagreeCount,
  contributeStatus,
}: VoteListCardProps) => {
  const translateStatus: { [key: string]: string } = {
    MERGED: '반영 완료',
    DEBATING: '토론 중',
    REJECTED: '미반영',
  };

  const router = useRouter();
  const handleClickVoteCard = () => {
    if (contributeStatus === 'DEBATING') {
      router.push(`/debateList/${contributeId}`); // FIXME contributeId가 아니라 debateId로 변경
    } else {
      router.push(`/voteList/${contributeId}`);
    }
  };

  return (
    <Card
      display="flex"
      mb="1rem"
      width="full"
      rounded="md"
      padding="1rem"
      justify="space-between"
      border={2}
      borderColor="black"
      colorScheme="blue"
      direction={{ base: 'column', sm: 'row' }}
      _hover={{
        bg: 'gray.50',
        cursor: 'pointer',
      }}
      onClick={handleClickVoteCard}
    >
      <div>
        <h2 className="text-sm text-gray-400 mb-1">{documentTitle}</h2>
        <h2 className="text-md font-semibold mb-1">{contributeTitle}</h2>
        <div className="flex place-items-center mb-1">
          <p className="text-xs mr-3">{contributorNickname}</p>
          <p className="text-xs text-gray">{createTime}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="justify-between">
          <LikeDislike likeNum={agreeCount} dislikeNum={disagreeCount} />
        </div>
        {contributeStatus !== 'VOTING' && (
          <Badge colorScheme="green" width="fit-content" alignSelf="end">
            {translateStatus[contributeStatus] || '투표 상태'}
          </Badge>
        )}
      </div>
    </Card>
  );
};

export default VoteListCard;
