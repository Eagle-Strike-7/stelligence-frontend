'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import { Heading } from '@/types/common/ResponseType';
import StarContent from '../../components/StarContent';

interface SectionShowProps {
  heading: Heading;
  title: string;
  content: string;
  setState: (value: '읽기' | '수정' | '추가' | '삭제') => void;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const headSizeClass: { [key: string]: string } = {
  // TODO : option 수 생각하기
  H1: 'text-4xl',
  H2: 'text-3xl',
  H3: 'text-2xl',
};

// NOTE : 글의 섹션 한 개를 읽기모드로 보여주는 컴포넌트 (상세보기, 수정)
const ReviseStarSectionShow = ({
  heading,
  title,
  content,
  setState,
  handleClick,
}: SectionShowProps) => {
  const headSize = headSizeClass[heading] || 'text-lg';

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const handleEditClick = () => {
    setState('수정');
  };

  const handleQuit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setState('삭제');
    if (handleClick) {
      handleClick(e);
    }
    onClose();
  };

  return (
    <div className="flex flex-col w-full my-6">
      <div className="flex flex-row justify-between items-center justify-items-center mb-2">
        <span className={`${headSize} text-white font-bold align-middle`}>
          {title}
        </span>
        <div className="space-x-2">
          <Button
            size="md"
            color="primary.500"
            borderColor="primary.500"
            _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
            variant="outline"
            h="2rem"
            onClick={handleEditClick}
          >
            수정
          </Button>
          <Button
            size="md"
            color="primary.500"
            borderColor="primary.500"
            _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
            variant="outline"
            h="2rem"
            onClick={onOpen}
          >
            삭제
          </Button>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg">
                  {title} 섹션 삭제하기
                </AlertDialogHeader>
                <AlertDialogBody>
                  삭제하시겠습니까? 삭제된 섹션은 되돌릴 수 없습니다.
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
                    취소
                  </Button>
                  <Button onClick={handleQuit} ml={3}>
                    삭제
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </div>
      </div>
      <StarContent content={content} />
    </div>
  );
};

export default ReviseStarSectionShow;
