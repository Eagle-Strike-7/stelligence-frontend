import { Input } from '@chakra-ui/react';
import React from 'react';

const TitleInput = ({
  title,
  content,
  isDisable,
}: {
  title: string;
  content: string;
  isDisable: boolean;
}) => {
  return (
    <div className="flex flex-row gap-3 items-center">
      <span className="text-md font-bold">{title}</span>
      <Input
        className="flex-grow"
        placeholder="내용을 입력하세요"
        size="md"
        width="auto"
        isDisabled={isDisable}
        value={content}
        sx={{
          _disabled: {
            opacity: '1',
          },
        }}
      />
    </div>
  );
};

export default TitleInput;
