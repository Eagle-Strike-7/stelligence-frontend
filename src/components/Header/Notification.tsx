import getNotifications, {
  NotificationData,
} from '@/service/notification/notificationService';
import { ResponseType } from '@/types/common/ResponseType';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaCircle, FaRegTrashAlt } from 'react-icons/fa';

const Notification = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const { data: notificationData } = useQuery<ResponseType<NotificationData>>({
    queryKey: ['notification'],
    queryFn: getNotifications,
  });
  useEffect(() => {
    setNotifications(notificationData?.results ?? []);
  }, [notificationData]);

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
