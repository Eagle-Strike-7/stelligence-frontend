import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { FaCircle, FaRegTrashAlt } from 'react-icons/fa';

const Notification = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  // NOTE 알림
  const notifications = [
    {
      notificationId: 0,
      message: '마리모는 귀엽다에 댓글이 달렸습니다. 확인해보세요!',
      uri: '/vote/1',
      createdAt: '2024-02-14T16:24:45.440Z',
      read: true,
    },
    {
      notificationId: 1,
      message:
        '마리모가 귀엽다고 생각하세요?에 댓글이 달렸습니다. 확인해보세요!',
      uri: '/vote/1',
      createdAt: '2024-02-14T16:24:45.440Z',
      read: false,
    },
    {
      notificationId: 2,
      message: '마리모는 귀엽다에 댓글이 달렸습니다. 확인해보세요!',
      uri: '/vote/1',
      createdAt: '2024-02-14T16:24:45.440Z',
      read: false,
    },
    {
      notificationId: 3,
      message: '마리모는 귀엽다에 댓글이 달렸습니다. 확인해보세요!',
      uri: '/vote/1',
      createdAt: '2024-02-14T16:24:45.440Z',
      read: true,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bgColor="transparent" />
      <ModalContent
        position="fixed"
        top="0"
        right="1rem"
        width="25rem"
        padding={0}
      >
        <ModalHeader display="flex" flexDirection="column" gap={2} paddingX="4">
          <div className="flex flex-row justify-between">
            <h1 className="text-lg text-black font-bold">알림</h1>
            <div className="flex flex-row gap-2">
              <Button variant="outline" size="xs">
                모두 읽음
              </Button>
              <Button variant="outline" size="xs">
                모두 삭제
              </Button>
            </div>
          </div>
        </ModalHeader>
        <ModalBody paddingX="4">
          <div className="flex flex-col gap-4 mb-4 ">
            {notifications.map(item => {
              return (
                <div key={item.notificationId} className="flex flex-col">
                  <div className="flex flex-row gap-2 justify-between">
                    <div className="text-secondary-dark">
                      <FaCircle className="w-2 h-2" />
                    </div>
                    <Link href={item.uri} className="text-sm text-black flex-1">
                      {item.message}
                    </Link>
                    <Button
                      color="primaryGray.500"
                      fontSize="xs"
                      bg="transparent"
                      size="xs"
                    >
                      <FaRegTrashAlt />
                    </Button>
                  </div>
                  <div className="flex justify-end">
                    <p className="text-xs text-slate-500">{item.createdAt}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Notification;
