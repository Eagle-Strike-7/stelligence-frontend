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
} from '@chakra-ui/react';
import apiClient from '@/service/login/axiosClient';
import axios from 'axios';

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title: 'comment' | 'document';
  dataId: number;
}

const ReportModal: React.FC<ModalComponentProps> = ({
  isOpen,
  onClose,
  title,
  dataId,
}) => {
  const [description, setDescription] = useState<string>('');
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

  const handleReportComment = async () => {
    try {
      const response = apiClient.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reports/comments/${dataId}`,
        { description: `[${selectedReportOption}] ${description}` },
      );
      onClose();
      if (response) {
        console.log('신고 성공:', response);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios 에러 발생:', error.message);
      } else {
        console.log('알 수 없는 에러 발생:', error);
      }
    }
  };

  const handleReportDocument = async () => {
    try {
      const response = apiClient.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reports/documents/${dataId}`,
        { description: `[${selectedReportOption}] ${description}` },
      );
      onClose();
      if (response) {
        console.log('문서 신고 성공:', response);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios 에러 발생:', error.message);
      } else {
        console.log('알 수 없는 에러 발생:', error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="md">
          {title === 'comment' ? '댓글 신고' : '문서 신고'}
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
              value={description}
              onChange={e => {
                setDescription(e.target.value);
              }}
              placeholder="여기에 신고할 내용을 상세히 적어주세요🚨"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="gray"
            mr={3}
            onClick={onClose}
            fontSize="sm"
            size="sm"
          >
            취소
          </Button>
          <Button
            colorScheme="red"
            mr={3}
            onClick={
              title === 'comment' ? handleReportComment : handleReportDocument
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
