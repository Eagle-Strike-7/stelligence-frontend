import { LikeDislikeProps } from '@/types/common/LikeDislikeProps';
import React from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

const LikeDislike: React.FC<LikeDislikeProps> = ({ likeNum, dislikeNum }) => {
  return (
    <div className="flex gap-2">
      <div className="flex gap-1">
        <AiOutlineLike size="1.2rem" />
        <span className="text-sm"> {likeNum}</span>
      </div>
      <div className="flex gap-1">
        <AiOutlineDislike size="1.2rem" />
        <span className="text-sm"> {dislikeNum}</span>
      </div>
    </div>
  );
};

export default LikeDislike;
