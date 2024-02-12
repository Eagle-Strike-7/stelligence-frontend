import { DocStatus } from '@/types/star/StarProps';
import { Button, useToast } from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

interface StarStatusButtonProps {
  documentStatus: DocStatus;
  id: { contributeId: number; debateId: number };
}

const StarStatusButton = ({ documentStatus, id }: StarStatusButtonProps) => {
  const starId = Number(useParams().starId);
  const router = useRouter();
  const toast = useToast();

  const handleEdit = () => {
    router.push(`/stars/${starId}/revise`);
  };

  const handleVoting = () => {
    router.push(`/vote-list/${id}`);
  };

  const handleDebating = () => {
    router.push(`/debate-list/${id}`);
  };

  const handlePending = () => {
    toast({
      title: '수정 요청 반영 중입니다. \n편집이 불가능합니다.',
      status: 'error',
      isClosable: true,
    });
  };

  return (
    <>
      {documentStatus === DocStatus.EDITABLE && (
        <Button
          size="md"
          color="white"
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
