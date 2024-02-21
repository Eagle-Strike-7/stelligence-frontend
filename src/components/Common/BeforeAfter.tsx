import ReviseContent from '@/app/vote-list/[voteId]/components/ReviseContent';
import { WriteType } from '@/types/common/ResponseType';
import React from 'react';
import ReviseDescription from '../ReviseDescription';

const BeforeAfter = ({
  index,
  type,
  beforeHeading,
  afterHeading,
  beforeTitle,
  afterTitle,
  beforeContent,
  afterContent,
}: {
  index: number;
  type: WriteType;
  beforeHeading: string;
  afterHeading: string;
  beforeTitle: string;
  afterTitle: string;
  beforeContent: string;
  afterContent: string;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <ReviseDescription index={index} type={type} />

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          <ReviseContent
            heading={beforeHeading}
            title={beforeTitle}
            content={beforeContent}
          />
        </div>
        <div className="flex flex-col gap-1">
          {type === 'CREATE' && (
            <ReviseContent
              heading={beforeHeading ?? ''}
              title={beforeTitle ?? ''}
              content={beforeContent ?? ''}
            />
          )}
          <ReviseContent
            heading={type === 'DELETE' ? beforeHeading : afterHeading}
            title={type === 'DELETE' ? beforeTitle : afterTitle}
            content={type === 'DELETE' ? beforeContent : afterContent}
            type={type}
          />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfter;
