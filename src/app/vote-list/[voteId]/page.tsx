'use client';

import BeforeAfter from '@/components/Common/BeforeAfter';
import Wrapper from '@/components/Common/Wrapper';
import {
  Card,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ReviseInformation from '@/app/vote-list/[voteId]/components/ReviseInformation';
import PageTitleDescription from '@/components/Common/Title/PageTitleDescription';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import {
  ReviseDataResponse,
  VoteResponse,
  deleteReviseData,
  getReviseData,
  getVoteData,
} from '@/service/vote/voteService';
import { IoIosMore } from 'react-icons/io';
import { HiOutlineTrash } from 'react-icons/hi';
import { AxiosError, AxiosResponse } from 'axios';
import Vote from './components/Vote';

interface ErrorResponse {
  success: boolean;
  message: string;
  results: string;
}

const Page = () => {
  const [status, setStatus] = useState<string | undefined>('DEFAULT');
  const contributeId = Number(useParams().voteId);
  const queryClient = useQueryClient();
  const toast = useToast();
  const router = useRouter();

  const { data: contributeData, isLoading } = useQuery<ReviseDataResponse>({
    queryKey: ['contribute', contributeId],
    queryFn: () => {
      return getReviseData(contributeId);
    },
  });

  const { data: voteData } = useQuery<VoteResponse>({
    queryKey: ['vote', contributeId],
    queryFn: () => {
      return getVoteData(contributeId);
    },
  });

  const deleteReviseMutation = useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: deleteReviseData,
    onSuccess: () => {
      // TODO 수정요청 삭제 테스트 필요
      queryClient.invalidateQueries({ queryKey: ['contribute', contributeId] });
      toast({
        title: '수정요청이 삭제되었습니다.',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      router.push('/vote-list');
    },
    onError: (error: AxiosError) => {
      console.error('수정요청 삭제 실패: ', error);
      if (error.response) {
        const errorData = error.response.data as ErrorResponse;
        toast({
          title: '삭제 실패',
          description: `${errorData.message}`,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: '삭제 실패',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    },
  });

  useEffect(() => {
    setStatus(contributeData?.results.contributeStatus ?? 'DEFAULT');
  }, [contributeData]);

  const handleDeleteRevise = () => {
    deleteReviseMutation.mutate(contributeId);
  };

  if (isLoading) {
    return (
      <Wrapper>
        <div>웜홀 타고 이동중...🧑‍🚀</div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="pt-5">
        <div className="flex justify-between">
          <PageTitleDescription
            title={status === 'VOTING' ? '투표하기' : '투표 결과'}
            description="수정요청 반영 여부에 대해 투표하세요!"
            relatedDebateId={contributeData?.results.relatedDebateId}
          />
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<IoIosMore />}
              bgColor="transparent"
              color="white"
              fontSize="2xl"
              _hover={{
                bgColor: 'transparent',
                color: 'white',
              }}
              _focus={{
                bgColor: 'transparent',
                color: 'white',
              }}
            />
            <MenuList>
              <MenuItem icon={<HiOutlineTrash />} onClick={handleDeleteRevise}>
                삭제하기
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className="flex flex-col gap-8">
          {/* SECTION 수정요청 글 정보 영역 */}
          {contributeData && <ReviseInformation reviseData={contributeData} />}
          <hr />
          {/* SECTION 수정요청 사항 영역 */}
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">수정 요청 사항</h2>
            <div className="grid grid-cols-2 mb-6">
              <p className="text-lg text-center text-gray-500">수정 전</p>
              <p className="text-lg text-center text-gray-500">수정 후</p>
            </div>
            {/* SECTION 글 제목 변경사항 */}
            {contributeData?.results.beforeDocumentTitle !==
              contributeData?.results.afterDocumentTitle && (
              <div className="mb-6">
                <h3 className="text font-bold text-white">글 제목</h3>
                <div className="grid grid-cols-2 mt-2 gap-4">
                  <Input
                    isDisabled
                    value={contributeData?.results.beforeDocumentTitle}
                    bg="transparent"
                    color="white"
                    borderColor="primaryGray.500"
                    textAlign="center"
                    paddingY="1.5rem"
                    sx={{
                      _disabled: {
                        color: 'white',
                      },
                    }}
                  />
                  <Input
                    isDisabled
                    value={contributeData?.results.afterDocumentTitle}
                    bg="transparent"
                    color="white"
                    borderColor="primaryGray.500"
                    textAlign="center"
                    paddingY="1.5rem"
                    sx={{
                      _disabled: {
                        color: 'white',
                      },
                    }}
                  />
                </div>
              </div>
            )}
            {/* SECTION 상위 계층 태그 변경사항 */}
            {contributeData?.results.beforeParentDocumentTitle !==
              contributeData?.results.afterParentDocumentTitle && (
              <div>
                <h3 className="text font-bold text-white">상위 계층 태그</h3>
                <div className="grid grid-cols-2 mt-2 gap-4">
                  <Input
                    isDisabled
                    value={contributeData?.results.beforeParentDocumentTitle}
                    bg="transparent"
                    color="white"
                    borderColor="primaryGray.500"
                    textAlign="center"
                    paddingY="1.5rem"
                    sx={{
                      _disabled: {
                        color: 'white',
                      },
                    }}
                  />
                  <Input
                    isDisabled
                    value={contributeData?.results.afterParentDocumentTitle}
                    bg="transparent"
                    color="white"
                    borderColor="primaryGray.500"
                    textAlign="center"
                    paddingY="1.5rem"
                    sx={{
                      _disabled: {
                        color: 'white',
                      },
                    }}
                  />
                </div>
              </div>
            )}
            {/* SECTION 수정요청 사항 내용 영역 */}
            <div className="flex flex-col gap-16 mt-6">
              {contributeData?.results.amendments?.map((amendment, index) => {
                return (
                  <BeforeAfter
                    key={amendment.amendmentId}
                    index={index}
                    beforeHeading={amendment.targetSection.heading}
                    afterHeading={amendment.requestedSectionHeading}
                    beforeTitle={amendment.targetSection.title}
                    afterTitle={amendment.requestedSectionTitle}
                    beforeContent={amendment.targetSection.content}
                    afterContent={amendment.requestedSectionContent}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {/* SECTION 투표 영역 */}
        <div className="mt-16">
          <Card
            padding="2rem"
            variant="outline"
            borderColor="primaryGray.500"
            bgColor="transparent"
            color="white"
          >
            {voteData && (
              <Vote
                voteData={voteData}
                contributeId={contributeId}
                status={status}
              />
            )}
          </Card>
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;
