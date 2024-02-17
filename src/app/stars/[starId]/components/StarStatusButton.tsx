import {
  ReviseStateProps,
  getDocumentReviseState,
} from '@/service/debate/reviseAuth';
import { DocStatus } from '@/types/star/StarProps';
import { Button, useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

const StarStatusButton = () => {
  const starId = Number(useParams().starId);
  const router = useRouter();
  const toast = useToast();

  const { data: reviseAuthData } = useQuery<
    ReviseStateProps | undefined,
    Error,
    ReviseStateProps,
    [string, number | undefined]
  >({
    queryKey: ['reviseAuth', starId],
    queryFn: () => {
      if (!starId) {
        // NOTE documentId가 없는 경우 즉시 종료하고 undefined를 반환
        return Promise.resolve(undefined);
      }
      return getDocumentReviseState(starId);
    },
    enabled: !!starId,
  });

  const handleEdit = () => {
    router.push(`/stars/${starId}/revise`);
  };

  const handleVoting = () => {
    router.push(`/vote-list/${reviseAuthData?.contributeId}`);
  };

  const handleDebating = () => {
    router.push(`/debate-list/${reviseAuthData?.debateId}`);
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
      {reviseAuthData?.documentStatus === DocStatus.EDITABLE && (
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
      {reviseAuthData?.documentStatus === DocStatus.VOTING && (
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
      {reviseAuthData?.documentStatus === DocStatus.DEBATING && (
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
      {reviseAuthData?.documentStatus === DocStatus.PENDING && ( // TODO : 이름 변경 필요
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
