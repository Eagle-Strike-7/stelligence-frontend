import apiClient from '@/service/login/axiosClient';
import { StarResponseType } from '@/types/common/ResponseType';
import { DocStatus } from '@/types/star/StarProps';
import { Button, useToast } from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface StarStatus {
  documentId: number;
  documentStatus: DocStatus;
  contributeId: number;
  debateId: number;
}

const StarStatusButton = () => {
  const starId = Number(useParams().starId);
  const router = useRouter();
  const toast = useToast();

  const [documentStatus, setDocumentStatus] = useState<DocStatus>(
    DocStatus.EDITABLE,
  );
  const [contributeId, setContributeId] = useState<number | null>(0);
  const [debateId, setDebateId] = useState<number | null>(0);

  const getStarStatus = async () => {
    // TODO : getStar 분리
    try {
      const response = await apiClient.get<StarResponseType<StarStatus>>(
        `/api/documents/${starId}/status`,
      );
      const { data } = response;
      console.log('data', data); // FIXME : 기능완성 시 삭제예정
      if (data.success && data.results.documentId === starId) {
        setDocumentStatus(data.results.documentStatus);
        setContributeId(data.results.contributeId);
        setDebateId(data.results.debateId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    router.push(`/stars/${starId}/revise`);
  };

  const handleVoting = () => {
    router.push(`/vote-list/${contributeId}`);
  };

  const handleDebating = () => {
    router.push(`/debate-list/${debateId}`);
  };

  const handlePending = () => {
    toast({
      title: '수정 요청 반영 중입니다. \n편집이 불가능합니다.',
      status: 'error',
      isClosable: true,
    });
  };

  useEffect(() => {
    getStarStatus();
  }, []);

  return (
    <>
      {documentStatus === DocStatus.EDITABLE && (
        <Button
          size="md"
          color="primary.500"
          borderColor="primary.500"
          _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
          variant="outline"
          onClick={handleEdit}
        >
          편집
        </Button>
      )}
      {documentStatus === DocStatus.VOTING && (
        <Button
          size="md"
          bgColor="primary.500"
          color="white"
          _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
          variant="solid"
          onClick={handleVoting}
        >
          투표중
        </Button>
      )}
      {documentStatus === DocStatus.DEBATING && (
        <Button
          size="md"
          bgColor="primary.500"
          color="white"
          _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
          variant="solid"
          onClick={handleDebating}
        >
          토론중
        </Button>
      )}
      {documentStatus === DocStatus.PENDING && ( // TODO : 이름 변경 필요
        <Button
          size="md"
          bgColor="primary.500"
          color="white"
          _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
          variant="solid"
          onClick={handlePending}
        >
          심사중
        </Button>
      )}
    </>
  );
};

export default StarStatusButton;
