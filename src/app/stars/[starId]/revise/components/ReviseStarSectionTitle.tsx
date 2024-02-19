import { Heading } from '@/types/common/ResponseType';
import { Button, Input, Select } from '@chakra-ui/react';

import React from 'react';

interface ReviseStarSectionTitleProps {
  heading: Heading;
  setHeading: (value: Heading) => void;
  title: string;
  setTitle: (value: string) => void;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const headSizeClass: { [key: string]: string } = {
  // TODO : option 수 생각하기
  H1: '4xl',
  H2: '3xl',
  H3: '2xl',
};

// NOTE : 글의 내용을 추가, 수정하는 컴포넌트
const ReviseStarSectionTitle = ({
  heading,
  setHeading,
  title,
  setTitle,
  handleClick,
}: ReviseStarSectionTitleProps) => {
  const handleHeadingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHeading = e.target.value as Heading;
    setHeading(newHeading);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  return (
    <div className="flex flex-col w-full justify-center my-8">
      <div className="flex flex-row w-full items-end mb-2">
        <Select
          size="sm"
          color="white"
          variant="flushed"
          w="6rem"
          value={heading}
          onChange={handleHeadingChange}
        >
          <option value="H1">H1</option>
          <option value="H2">H2</option>
          <option value="H3">H3</option>
        </Select>
        <Input
          size="sm"
          color="white"
          variant="flushed"
          h="fit-content"
          mx="0.5rem"
          value={title}
          onChange={handleTitleChange}
          sx={{
            fontSize: headSizeClass[heading],
            fontWeight: 'bold',
          }}
        />

        <Button
          size="md"
          color="white"
          colorScheme="gray"
          variant="outline"
          h="2rem"
          onClick={handleClick}
        >
          완료
        </Button>
      </div>
    </div>
  );
};

export default ReviseStarSectionTitle;
