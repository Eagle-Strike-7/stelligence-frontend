import ReviseContent from '@/app/vote-list/[voteId]/components/ReviseContent';
import { Tag } from '@chakra-ui/react';
import React from 'react';

const BeforeAfter = ({
  index,
  beforeHeading,
  afterHeading,
  beforeTitle,
  afterTitle,
  beforeContent,
  afterContent,
}: {
  index: number;
  beforeHeading: string;
  afterHeading: string;
  beforeTitle: string;
  afterTitle: string;
  beforeContent: string;
  afterContent: string;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <Tag bg="primary.500" color="black" fontSize="sm" width="fit-content">
        #{index + 1}
      </Tag>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          <ReviseContent
            heading={beforeHeading}
            title={beforeTitle}
            content={beforeContent}
          />
        </div>
        <div className="flex flex-col gap-1">
          <ReviseContent
            heading={afterHeading}
            title={afterTitle}
            content={afterContent}
          />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfter;
