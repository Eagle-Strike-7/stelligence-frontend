'use client';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';

interface NicknameModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const NicknameModal: React.FC<NicknameModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          회원가입 마지막 단계입니다✨ <br />
          닉네임 변경을 원하시면 수정해주세요.
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* TODO 서버에서 받아온 닉네임 value로 설정 */}
          <Input placeholder="닉네임을 입력해주세요" />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="accent" color="white">
            저장
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NicknameModal;
