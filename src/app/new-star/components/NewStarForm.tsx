'use client';

import React, { useState } from 'react';
import apiClient from '@/service/login/axiosClient';
import StarContentInput from '@/components/Common/Star/StarContentInput/StarContentInput';
import StarTitleInput from '@/components/Common/Star/StarTitleInput';
import StarTagInput from '@/components/Common/Star/StarTagInput';
import { NewStar } from '@/types/star/NewStarProps';
import SubmitButton from '@/components/Common/Button/SubmitButton';
import { useRouter } from 'next/navigation';
import { Tooltip, useToast } from '@chakra-ui/react';
import PageTitleDescription from '@/components/Common/Title/PageTitleDescription';
import { AiOutlineInfoCircle } from 'react-icons/ai';

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
    const startsWithHtag = /^<(h1|h2|h3)>/i;
    setTitle(title.trim());
    if (title === '' || title.length > 20) {
      toast({
        title: '20자 이하의 제목을 입력해주세요',
        status: 'error',
        isClosable: true,
      });
    } else if (content === '') {
      toast({
        title: '본문을 입력해주세요',
        status: 'error',
        isClosable: true,
      });
    } else if (startsWithHtag.test(content) === false) {
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
    <>
      <div className="flex flex-row items-center ml-32">
        <PageTitleDescription
          title="별 생성"
          description="새로운 글을 작성해보세요!"
        />
        <Tooltip
          hasArrow
          defaultIsOpen
          closeOnScroll
          arrowSize={10}
          label={
            <div style={{ width: '420px' }}>
              <p
                style={{
                  color: '#47588b',
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                작성팁!
              </p>
              1️⃣ <strong>[[글제목]]</strong>을 입력하면 다른 글을 언급할 수
              있어요!
              <br />
              2️⃣ <strong>#, ##, ###</strong>을 이용해 문단을 구분할 수 있어요!
            </div>
          }
          placement="right"
          color="black"
          backgroundColor="#f6f6f6"
          size="lg"
          padding="0.25rem 0.75rem"
          rounded="sm"
        >
          <div className="text-primary-dark-500 mb-1 ml-1">
            <AiOutlineInfoCircle size="17px" />
          </div>
        </Tooltip>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full px-32">
        <StarTitleInput
          inputTitle="글 제목"
          title={title}
          setTitle={setTitle}
        />
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
    </>
  );
};

export default NewStarForm;
