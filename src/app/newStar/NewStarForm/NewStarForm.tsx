import StarSectionInput from '@/components/Common/StarSectionInput';
import { Button, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import React from 'react';
import StarInput from './StarInput';

// NOTE : 새 글 작성 폼
// FIXME : 본문 Tiptap으로 변경 예정
const NewStarForm = () => {
  return (
    <div className="flex flex-col w-full pt-20 px-20">
      <StarInput
        inputTitleWidth={32}
        inputTitle="글제목"
        inputPlaceholder="글의 제목을 입력하세요"
      />
      <StarInput
        divMarginBottom={3}
        inputTitleWidth={32}
        inputTitle="상위 계층 태그"
        inputPlaceholder="연결할 글의 제목을 입력하세요"
      />
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
          background="accent.light"
        >
          생성하기
        </Button>
      </div>
    </div>
  );
};

export default NewStarForm;
