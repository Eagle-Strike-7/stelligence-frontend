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
  contributeStatus: 'VOTING' | 'MERGED' | 'DEBATING' | 'REJECTED';
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
  const translateStatus = {
    MERGED: { name: '반영 완료', color: 'primary.500' },
    DEBATING: { name: '토론', color: 'secondary.500' },
    REJECTED: { name: '미반영', color: 'tertiary.500' },
  };

  const router = useRouter();
  const handleClickVoteCard = () => {
    router.push(`/vote-list/${contributeId}`);
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
      bg="rgba(118, 147, 231,0.1)"
      color="white"
      direction={{ base: 'column', sm: 'row' }}
      _hover={{
        bg: 'rgba(118, 147, 231, 0.22)',
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
          <Badge
            bgColor={
              translateStatus[contributeStatus]
                ? translateStatus[contributeStatus].color
                : 'gray'
            }
            width="fit-content"
            alignSelf="end"
          >
            {translateStatus[contributeStatus]
              ? translateStatus[contributeStatus].name
              : '투표 상태'}
          </Badge>
        )}
      </div>
    </Card>
  );
};

export default VoteListCard;
