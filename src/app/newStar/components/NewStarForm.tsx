'use client';

import StarSectionInput from '@/components/Common/StarSectionInput';
import {
  Button,
  Input,
  Menu,
  MenuItem,
  MenuList,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react';
import React from 'react';

// NOTE : 새 글 작성 폼
// FIXME : StarInput 컴포넌트 / 입력필드 비었을 때 border 색상 변경
const NewStarForm = () => {
  return (
    <form className="flex flex-col w-full pt-20 px-20">
      <div className="flex flex-row w-full mb-6">
        <span className="w-32 text-lg font-bold mt-3 flex-shrink-0">
          글 제목
        </span>
        <Input
          size="lg"
          variant="outline"
          placeholder="글의 제목을 입력해 주세요"
        />
      </div>

      <div className="flex flex-row">
        <span className="w-32 text-lg font-bold mt-3">상위 계층 태그</span>
        <div className="mb-3 relative flex-grow">
          <Menu>
            <Input
              size="lg"
              variant="outline"
              placeholder="연결할 글의 제목을 입력해 주세요"
              zIndex="2"
            />
            <MenuList mt="3.5rem" w="100%" zIndex="1">
              <MenuItem>1</MenuItem>
              <MenuItem>2</MenuItem>
              <MenuItem>3</MenuItem>
              <MenuItem>4</MenuItem>
              <MenuItem>5</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>

      <Tag
        size="lg"
        variant="subtle"
        colorScheme="blue"
        ml="8rem"
        mb="1.5rem"
        minW="fit-content"
        maxW="fit-content"
      >
        <TagLabel>Green</TagLabel>
        <TagCloseButton />
      </Tag>

      <StarSectionInput inputTitle="본문" />

      <div className="flex justify-center">
        <Button
          mt="2.5rem"
          w="fit-content"
          size="lg"
          variant="solid"
          colorScheme="blue"
          background="accent.500"
          type="submit"
        >
          생성하기
        </Button>
      </div>
    </form>
  );
};

export default NewStarForm;
