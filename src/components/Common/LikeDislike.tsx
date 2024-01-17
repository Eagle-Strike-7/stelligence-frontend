import { LikeDislikeProps } from '@/types/common/LikeDislikeProps';
import React from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

const LikeDislike: React.FC<LikeDislikeProps> = ({ likeNum, dislikeNum }) => {
    return (
        <div className="flex">
            <div className="flex mr-2">
                <AiOutlineLike size="1.5rem" />
                <span> {likeNum}</span>
            </div>
            <div className="flex">
                <AiOutlineDislike size="1.5rem" />
                <span> {dislikeNum}</span>
            </div>
        </div>
    );
};

export default LikeDislike;
