import React from 'react';
import { Tag } from '@chakra-ui/react';

// NOTE : 글의 기여자를 보여주는 컴포넌트
// FIXME : 기여자 id 추가
const StarAuthors = ({
  originalAuthor,
  contributors,
}: {
  originalAuthor: string;
  contributors: string[];
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="text-lg font-bold align-middle mb-5">
        이 글에 참여한 사람
      </div>
      <div className="flex flex-row mb-3">
        <span className="text-lg align-middle">최초 작성자</span>
        <Tag
          ml="0.5rem"
          h="2rem"
          colorScheme="blue"
          variant="subtle"
          size="lg"
          fontSize="sm"
          fontWeight="extrabold"
        >
          {originalAuthor}
        </Tag>
      </div>
      {contributors.length > 0 && (
        <div className="flex flex-row mb-14">
          <span className="text-lg align-middle mt-0.5">기여자</span>
          <div className="flex flex-row flex-wrap">
            {contributors &&
              contributors.map((contributor, index) => {
                return (
                  <Tag
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    ml="0.5rem"
                    h="2rem"
                    colorScheme="gray"
                    variant="subtle"
                    size="lg"
                    fontSize="sm"
                    fontWeight="extrabold"
                  >
                    {contributor}
                  </Tag>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StarAuthors;
