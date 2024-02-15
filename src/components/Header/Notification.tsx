import formatDate from '@/lib/formatDate';
import getNotifications, {
  NotificationData,
  deleteNotification,
  deleteNotificationAll,
  patchNotification,
  patchNotificationAll,
} from '@/service/notification/notificationService';
import { ResponseType } from '@/types/common/ResponseType';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
  const toast = useToast();
  // const router = useRouter();
  const queryClient = useQueryClient();
  const { data: notificationData } = useQuery<ResponseType<NotificationData>>({
    queryKey: ['notification'],
    queryFn: getNotifications,
  });
  useEffect(() => {
    setNotifications(notificationData?.results ?? []);
  }, [notificationData]);

  const patchNotificationAllMutation = useMutation({
    mutationFn: patchNotificationAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
      toast({
        title: '알림 전체 읽음 처리 완료 🌻',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: '알림 전체 읽음처리 실패',
        description: '잠시 후 다시 시도해주세요',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const deleteNotificatationAllMutation = useMutation({
    mutationFn: deleteNotificationAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
      toast({
        title: '알림 전체 삭제 완료 🦦',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: '알림 전체 삭제 실패',
        description: '잠시 후 다시 시도해주세요',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const patchNotificationMutation = useMutation({
    mutationFn: patchNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
      onClose();
    },
    onError: () => {
      toast({
        title: '알림 개별 읽음 실패',
        description: '잠시 후 다시 시도해주세요',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
    },
    onError: () => {
      toast({
        title: '알림 개별 삭제 실패',
        description: '잠시 후 다시 시도해주세요',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const handlePatchNotificationAll = () => {
    patchNotificationAllMutation.mutate();
  };
  const handleDeleteNotificaltionsAll = () => {
    deleteNotificatationAllMutation.mutate();
  };

  const handlePatchNotification = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget as HTMLAnchorElement;
    const notificationId = link.dataset.notificationid;
    patchNotificationMutation.mutate(Number(notificationId));
  };

  const handleDeleteNotification = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget as HTMLButtonElement;
    const notificationId = button.dataset.notificationid;
    deleteNotificationMutation.mutate(Number(notificationId));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bgColor="transparent" />
      <ModalContent
        position="fixed"
        top="0"
        right="5rem"
        width="25rem"
        padding={0}
      >
        <ModalHeader display="flex" flexDirection="column" gap={2} paddingX="4">
          <div className="flex flex-row justify-between">
            <h1 className="text-lg text-black font-bold">알림</h1>
            <div className="flex flex-row gap-2">
              <Button
                variant="outline"
                size="xs"
                onClick={handlePatchNotificationAll}
              >
                모두 읽음
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={handleDeleteNotificaltionsAll}
              >
                모두 삭제
              </Button>
            </div>
          </div>
        </ModalHeader>
        <ModalBody paddingRight={0} paddingLeft={2}>
          <div className="flex flex-col gap-4 mb-4 h-80 overflow-y-scroll px-2">
            {notifications.map(item => {
              return (
                <div key={item.notificationId} className="flex flex-col">
                  <div className="flex flex-row gap-2 justify-between">
                    {!item.read && (
                      <div className="text-secondary-dark">
                        <FaCircle className="w-2 h-2" />
                      </div>
                    )}
                    <Link
                      href={item.uri}
                      data-uri={item.uri}
                      data-notificationid={item.notificationId}
                      className="text-sm text-black flex-1"
                      onClick={handlePatchNotification}
                    >
                      {item.message}
                    </Link>
                    <Button
                      color="primaryGray.500"
                      fontSize="xs"
                      bg="transparent"
                      size="xs"
                      data-notificationid={item.notificationId}
                      onClick={handleDeleteNotification}
                    >
                      <FaRegTrashAlt />
                    </Button>
                  </div>
                  <div className="flex justify-end">
                    <p className="text-xs text-slate-500">
                      {formatDate(item.createdAt)}
                    </p>
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
