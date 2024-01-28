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
    <div>
      <h1>투표하기</h1>
      <div>
        <span>{agreePercent}%</span>
        <span>{disAgreePercent}%</span>
      </div>
      <Progress
        colorScheme="blue"
        value={50}
        size="lg"
        sx={{
          borderRadius: '1rem',
        }}
      />
      <div>
        <span>찬성({agreeNum}표)</span>
        <span>반대({disAgreeNum}표)</span>
      </div>
      <div>
        <Button leftIcon={<FaRegThumbsUp />}>찬성</Button>
        <Button leftIcon={<FaRegThumbsDown />}>반대</Button>
      </div>
    </div>
  );
};

export default Vote;
