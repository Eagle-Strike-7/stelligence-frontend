import { Textarea } from '@chakra-ui/react';
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
      <h1 className="text-lg font-bold">#{index + 1}</h1>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          <Textarea
            isDisabled
            value={`${beforeHeading} ${beforeTitle}${'\n'}${beforeContent}`}
            height="20rem"
            lineHeight="1.5rem"
            resize="none"
            padding={5}
            fontSize="md"
            backgroundColor="white"
            sx={{
              _disabled: {
                color: 'black',
              },
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Textarea
            isDisabled
            value={`${afterHeading} ${afterTitle}${'\n'}${afterContent}`}
            height="20rem"
            lineHeight="1.5rem"
            resize="none"
            padding={5}
            fontSize="md"
            backgroundColor="white"
            sx={{
              _disabled: {
                color: 'black',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfter;
