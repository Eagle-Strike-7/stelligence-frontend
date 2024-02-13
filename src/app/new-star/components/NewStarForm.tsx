'use client';

import React, { useState } from 'react';
import apiClient from '@/service/login/axiosClient';
import StarContentInput from '@/components/Common/Star/StarContentInput/StarContentInput';
import StarTitleInput from '@/components/Common/Star/StarTitleInput';
import StarTagInput from '@/components/Common/Star/StarTagInput';
import { NewStar } from '@/types/star/NewStarProps';
import SubmitButton from '@/components/Common/Button/SubmitButton';
import { useRouter } from 'next/navigation';
import { useToast } from '@chakra-ui/react';

const NewStarForm = () => {
  const router = useRouter();
  const toast = useToast();
  const [title, setTitle] = useState<string>('');
  const [parentDocumentId, setParentDocumentId] = useState<number | null>(null);
  const [content, setContent] = useState<string>('');

  const postNewStar = async (star: NewStar) => {
    try {
      const response = await apiClient.post(
        `/api/documents`,
        JSON.stringify(star),
      );
      console.log('response', response.data); // FIXME : 기능완성 시 삭제예정
      if (response.data.success) {
        // 요청 성공하면 해당 문서로 이동
        const { documentId } = response.data.results;
        router.push(`/stars/${documentId}`);
      }
    } catch (error) {
      // 요청 실패하면 에러 출력
      toast({
        title: '글 생성에 실패했습니다.\n 다시 시도해주세요.',
        status: 'error',
        isClosable: true,
      });
      console.error('Error:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const startsWithH2orH3 = /^<(h1|h2|h3)>/i;
    if (title === '' || title.length > 20) {
      toast({
        title: '제목을 입력해주세요',
        status: 'error',
        isClosable: true,
      });
    } else if (content === '') {
      toast({
        title: '본문을 입력해주세요',
        status: 'error',
        isClosable: true,
      });
    } else if (startsWithH2orH3.test(content) === false) {
      toast({
        title:
          '본문은 소제목으로 시작해야 합니다.\n##, ###을 통해 소제목을 생성해주세요.',
        status: 'error',
        isClosable: true,
      });
    } else {
      const newStar = {
        title,
        parentDocumentId,
        content,
      };
      console.log(newStar);
      postNewStar(newStar);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full pt-5 px-32">
      <StarTitleInput inputTitle="글 제목" title={title} setTitle={setTitle} />
      <StarTagInput
        inputTitle="상위 계층 태그"
        setParentDocumentId={setParentDocumentId}
      />

      <div className="flex flex-col w-full">
        <div className="text-white text-md font-bold mb-2">본문</div>
        <StarContentInput content={content} setContent={setContent} />
      </div>

      <SubmitButton name="생성하기" />
    </form>
  );
};

export default NewStarForm;
