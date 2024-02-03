import { Button, Progress } from '@chakra-ui/react';
import React from 'react';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';

const Vote = ({
  agreePercent,
  disAgreePercent,
  agreeNum,
  disAgreeNum,
}: {
  agreePercent: number;
  disAgreePercent: number;
  agreeNum: number;
  disAgreeNum: number;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl font-bold mb-3">투표하기</h1>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between">
          <span className="text-lg font-bold">{agreePercent}%</span>
          <span className="text-lg font-bold">{disAgreePercent}%</span>
        </div>
        <Progress
          bg="red.500"
          colorScheme="blue"
          value={agreePercent}
          height="2rem"
          sx={{
            borderRadius: '1rem',
          }}
        />
        <div className="flex flex-row justify-between">
          <span className="font-bold">찬성({agreeNum}표)</span>
          <span className="font-bold">반대({disAgreeNum}표)</span>
        </div>
      </div>
      <div className="flex flex-row gap-4 justify-center">
        {/* TODO 선택 시 색상 변경 */}
        <Button
          leftIcon={<FaRegThumbsUp />}
          _hover={{
            bg: 'blue.500',
            color: 'white',
          }}
        >
          찬성
        </Button>
        <Button
          leftIcon={<FaRegThumbsDown />}
          _hover={{
            bg: 'red.500',
            color: 'white',
          }}
        >
          반대
        </Button>
      </div>
    </div>
  );
};

export default Vote;
