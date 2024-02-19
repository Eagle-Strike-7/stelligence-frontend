import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import apiClient from '@/service/login/axiosClient';
import axios from 'axios';

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'comment' | 'document';
  dataId: number;
}

const ReportModal: React.FC<ModalComponentProps> = ({
  isOpen,
  onClose: originalOnClose,
  type,
  dataId,
}) => {
  const toast = useToast();
  const [reportContent, setReportContent] = useState<string>('');
  const [selectedReportOption, setSelectedReportOption] =
    useState<string>('부적절한 내용 신고');
  const reportOptions = [
    '부적절한 내용 신고',
    '오류나 부정확한 정보 신고',
    '저작권 침해 신고',
    '스팸 또는 광고 내용 신고',
    '개인정보 침해 신고',
    '악의적 행위 신고',
    '중복 콘텐츠 신고',
  ];

  const handleSelectReportOption = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedReportOption(e.target.value);
  };

  const showToast = (
    title: string,
    description: string,
    status: 'info' | 'warning' | 'success' | 'error',
  ) => {
    toast({
      title,
      description,
      status,
      duration: 2000,
      isClosable: true,
    });
  };

  const resetStates = () => {
    setReportContent('');
    setSelectedReportOption('부적절한 내용 신고'); // 첫 번째 옵션으로 초기화
  };

  const handleClose = () => {
    resetStates();
    originalOnClose();
  };

  const handleReport = async (endpoint: string) => {
    if (!reportContent) {
      showToast('빈 신고', '신고할 내용을 채워주세요!', 'error');
      return;
    }
    try {
      await apiClient.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reports/${endpoint}/${dataId}`,
        { description: `[${selectedReportOption}] ${reportContent}` },
      );
      handleClose();
      showToast(
        '신고 성공!',
        '깨끗한 사용을 위해 힘써주셔서 감사합니다 :)',
        'success',
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showToast('신고 실패', error.response.data.message, 'error');
      } else {
        showToast('신고 실패', '알 수 없는 에러가 발생했습니다.', 'error');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="md">
          {type === 'comment' ? '댓글 신고' : '문서 신고'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel fontSize="md">선택</FormLabel>
            <Select fontSize="sm" onChange={handleSelectReportOption}>
              {reportOptions.map(option => {
                return <option key={option}>{option}</option>;
              })}
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel fontSize="md">상세내용</FormLabel>
            <Textarea
              fontSize="sm"
              w="full"
              value={reportContent}
              onChange={e => {
                setReportContent(e.target.value);
              }}
              placeholder="여기에 신고할 내용을 상세히 적어주세요🚨"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="gray"
            mr={3}
            onClick={handleClose}
            fontSize="sm"
            size="sm"
          >
            취소
          </Button>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() =>
              {return handleReport(type === 'comment' ? 'comments' : 'documents')}
            }
            fontSize="sm"
            size="sm"
          >
            신고
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportModal;
