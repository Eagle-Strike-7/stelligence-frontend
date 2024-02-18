import ReviseContent from '@/app/vote-list/[voteId]/components/ReviseContent';
import { WriteType } from '@/types/common/ResponseType';
import { Tag } from '@chakra-ui/react';
import React from 'react';

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
  const translateType = {
    UPDATE: {
      name: '수정',
      description: '해당 섹션의 내용이 수정되었습니다.',
      color: 'primary.500',
    },
    DELETE: {
      name: '삭제',
      description: '해당 섹션이 삭제 되었습니다.',
      color: 'secondary.500',
    },
    CREATE: {
      name: '생성',
      description: '"수정 후" 문단이 "수정 전" 문단 뒤에 추가되었습니다',
      color: 'tertiary.500',
    },
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-2 text-center items-center">
        <Tag bg="primary.500" color="black" fontSize="sm" width="fit-content">
          #{index + 1}
          <span className="font-bold">
            {translateType[type] ? `: ${translateType[type].name}` : ''}
          </span>
        </Tag>
        <span className="text-gray-300 text-sm">
          {translateType[type] ? `${translateType[type].description}` : ''}
        </span>
      </div>
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
