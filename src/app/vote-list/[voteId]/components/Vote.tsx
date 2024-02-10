import { VoteResponse, postVote } from '@/service/vote/voteService';
import { Button, Progress } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';

const Vote = ({
  voteData,
  contributeId,
}: {
  voteData: VoteResponse;
  contributeId: number;
}) => {
  const [myVote, setMyVote] = useState<boolean | null>(
    voteData?.results.myVote,
  );
  const queryClient = useQueryClient();
  const voteMutation = useMutation<
    AxiosResponse,
    Error,
    { contributeId: number; isAgree: boolean }
  >({
    mutationFn: postVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vote', contributeId] });
    },
    onError: (error: Error) => {
      console.error('투표 하기 실패: ', error);
    },
  });

  const handleVote = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget as HTMLButtonElement;
    const isAgree: boolean = button.dataset.vote === 'agree';
    if (myVote !== isAgree) {
      voteMutation.mutate({ contributeId, isAgree });
    } else {
      // TODO 이미 선택한 버튼을 클릭 시 버튼 배경색 기본색으로 변경
      setMyVote(null);
    }
  };

  const calculateAgreePercent = () => {
    const agree = voteData?.results.agreeCount;
    const disagree = voteData?.results.disagreeCount;
    if (agree === 0 && disagree === 0) return 0;
    return Math.floor((agree / (agree + disagree)) * 100);
  };
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl font-bold mb-3">투표하기</h1>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between">
          <span className="text-lg font-bold">{calculateAgreePercent()}%</span>
          <span className="text-lg font-bold">
            {100 - calculateAgreePercent()}%
          </span>
        </div>
        <Progress
          bg="red.500"
          colorScheme="blue"
          value={calculateAgreePercent()}
          height="2rem"
          sx={{
            borderRadius: '1rem',
          }}
        />
        <div className="flex flex-row justify-between">
          <span className="font-bold">
            찬성({voteData?.results.agreeCount}표)
          </span>
          <span className="font-bold">
            반대({voteData?.results.disagreeCount}표)
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-4 justify-center">
        <Button
          leftIcon={<FaRegThumbsUp />}
          _hover={{
            bg: 'blue.500',
            color: 'white',
          }}
          data-vote="agree"
          onClick={handleVote}
        >
          찬성
        </Button>
        <Button
          leftIcon={<FaRegThumbsDown />}
          _hover={{
            bg: 'red.500',
            color: 'white',
          }}
          data-vote="disagree"
          onClick={handleVote}
        >
          반대
        </Button>
      </div>
    </div>
  );
};

export default Vote;
