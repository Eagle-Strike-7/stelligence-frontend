import { WriteType } from '@/types/common/ResponseType';
import { Tag } from '@chakra-ui/react';
import React from 'react';

const ReviseDescription = ({
  index,
  type,
}: {
  index: number;
  type: WriteType;
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
      description: '"수정 전" 문단 뒤에 새 문단이 추가되었습니다',
      color: 'tertiary.500',
    },
  };
  return (
    <div className="flex flex-row gap-2 text-center items-center">
      <Tag bg="primary.500" color="black" fontSize="sm" width="fit-content">
        #{index + 1}
        <span className="font-bold hidden md:inline">
          {translateType[type] ? `: ${translateType[type].name}` : ''}
        </span>
      </Tag>
      <span className="text-gray-300 text-sm">
        {translateType[type] ? `${translateType[type].description}` : ''}
      </span>
    </div>
  );
};

export default ReviseDescription;
