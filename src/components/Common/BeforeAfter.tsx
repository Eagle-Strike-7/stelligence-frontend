import ReviseContent from '@/app/vote-list/[voteId]/components/ReviseContent';
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
      <h1 className="text-lg font-bold text-white">#{index + 1}</h1>
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
