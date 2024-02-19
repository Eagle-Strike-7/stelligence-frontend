import { VoteResponse, postVote } from '@/service/vote/voteService';
import { Button } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import VoteProgressBar from './VoteProgressBar';

const Vote = ({
  voteData,
  contributeId,
  status,
}: {
  voteData: VoteResponse;
  contributeId: number;
  status: string | undefined;
}) => {
  const [myVote, setMyVote] = useState<boolean | null>(
    voteData?.results.myVote,
  );
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [votePercent, setVotePercent] = useState<{
    agree: number;
    disagree: number;
  }>({ agree: 0, disagree: 0 });
  const queryClient = useQueryClient();
  const voteMutation = useMutation<
    VoteResponse,
    Error,
    { contributeId: number; isAgree: boolean }
  >({
    mutationFn: postVote,
    onSuccess: (data: VoteResponse) => {
      queryClient.invalidateQueries({ queryKey: ['vote', contributeId] });
      console.log('데이터는: ', data);
      setIsSuccess(data.success);
      setMyVote(data.results.myVote);
    },
    onError: (error: Error) => {
      console.error('투표 하기 실패: ', error);
    },
  });

  const handleVote = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget as HTMLButtonElement;
    const isAgree: boolean = button.dataset.vote === 'agree';
    voteMutation.mutate({ contributeId, isAgree });
    if (myVote !== isAgree) {
      setMyVote(isAgree);
    } else {
      // TODO 이미 선택한 버튼을 클릭 시 버튼 배경색 기본색으로 변경
      setMyVote(null);
    }
  };

  const calculateVotePercent = (agree: number, disagree: number) => {
    const total = agree + disagree;

    if (total === 0) {
      return { agree: 0, disagree: 0 };
    }

    const agreePercent = Math.floor((agree / total) * 100);
    const disagreePercent = 100 - agreePercent;
    return { agree: agreePercent, disagree: disagreePercent };
  };

  useEffect(() => {
    setMyVote(voteData.results.myVote);
    setVotePercent(
      calculateVotePercent(
        voteData.results.agreeCount,
        voteData.results.disagreeCount,
      ),
    );
  }, [voteData]);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl font-bold mb-3">
        {status === 'VOTING' ? '투표하기' : '투표 결과'}
      </h1>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between">
          <span className="text-lg font-bold">{votePercent.agree}%</span>
          <span className="text-lg font-bold">{votePercent.disagree}%</span>
        </div>
        <VoteProgressBar
          agree={votePercent.agree}
          disagree={votePercent.disagree}
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
      {status === 'VOTING' && (
        <div className="flex flex-row gap-4 justify-center">
          <Button
            leftIcon={<FaRegThumbsUp />}
            bgColor={isSuccess && myVote === true ? 'blue.500' : undefined}
            color={isSuccess && myVote === true ? 'white' : 'black'}
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
            bgColor={isSuccess && myVote === false ? 'red.500' : undefined}
            color={isSuccess && myVote === false ? 'white' : 'black'}
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
      )}
    </div>
  );
};

export default Vote;
