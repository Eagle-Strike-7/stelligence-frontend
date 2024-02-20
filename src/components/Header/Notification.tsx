import formatDate from '@/lib/formatDate';
import getNotifications, {
  NotificationData,
  deleteNotification,
  deleteNotificationAll,
  patchNotification,
  patchNotificationAll,
} from '@/service/notification/notificationService';
import { countNotification } from '@/store/notification/countNotification';
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
import React, { useEffect } from 'react';
import { FaCircle, FaRegTrashAlt } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import NoList from '../Common/NoList';

const Notification = ({
  isOpen,
  onClose,
  position,
}: {
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const setNotificationCount = useSetRecoilState(countNotification);

  // NOTE 알림 전체 조회
  const { data: notificationData } = useQuery<ResponseType<NotificationData>>({
    queryKey: ['notification'],
    queryFn: getNotifications,
  });

  useEffect(() => {
    const notReadCount = notificationData?.results.filter(
      item => {return !item.read},
    ).length;
    setNotificationCount({
      hasNotRead: !!notReadCount,
      count: notReadCount ?? 0,
    });
  }, [notificationData]);

  // NOTE 알림 전체 읽음 처리
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

  const handlePatchNotificationAll = () => {
    patchNotificationAllMutation.mutate();
  };

  // NOTE 알림 전체 삭제
  const deleteNotificationAllMutation = useMutation({
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

  const handleDeleteNotificationAll = () => {
    deleteNotificationAllMutation.mutate();
  };

  // NOTE 알림 개별 읽음 처리
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

  const handlePatchNotification = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget as HTMLAnchorElement;
    const notificationId = link.dataset.notificationid;
    patchNotificationMutation.mutate(Number(notificationId));
  };

  // NOTE 알림 개별 삭제
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

  const handleDeleteNotification = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget as HTMLButtonElement;
    const notificationId = button.dataset.notificationid;
    deleteNotificationMutation.mutate(Number(notificationId));
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bgColor="transparent" />
      <ModalContent
        position="absolute"
        top={`${position.top}px`}
        left={`${position.left}px`}
        width="20rem"
        padding={0}
        bgColor="#2e2e2e"
        borderWidth={2}
        borderColor="#292929"
        rounded="lg"
      >
        <ModalHeader display="flex" flexDirection="column" gap={2} paddingX="4">
          <div className="flex flex-row justify-between">
            <h1 className="text-lg text-white font-bold">알림</h1>
            <div className="flex flex-row gap-2">
              <Button
                variant="outline"
                size="xs"
                color="white"
                onClick={handlePatchNotificationAll}
              >
                모두 읽음
              </Button>
              <Button
                variant="outline"
                size="xs"
                color="white"
                onClick={handleDeleteNotificationAll}
              >
                모두 삭제
              </Button>
            </div>
          </div>
        </ModalHeader>
        <ModalBody paddingRight={0} paddingLeft={2}>
          <div className="flex flex-col gap-4 mb-4 h-80 overflow-y-scroll px-2">
            {notificationData?.results.length ? (
              notificationData?.results.map(item => {
                return (
                  <div key={item.notificationId} className="flex flex-col">
                    <div className="flex flex-row gap-2 justify-between">
                      {!item.read && (
                        <div className="text-secondary-dark mt-1">
                          <FaCircle className="w-2 h-2" />
                        </div>
                      )}
                      <Link
                        href={item.uri}
                        data-uri={item.uri}
                        data-notificationid={item.notificationId}
                        className="text-sm text-white flex-1"
                        onClick={handlePatchNotification}
                      >
                        {item.message}
                      </Link>
                      <Button
                        color="primary.500"
                        fontSize="xs"
                        bg="transparent"
                        size="xs"
                        width="fit-content"
                        padding={0}
                        _hover={{
                          bgColor: 'transparent',
                          color: 'white',
                        }}
                        data-notificationid={item.notificationId}
                        onClick={handleDeleteNotification}
                      >
                        <FaRegTrashAlt className="p-0" />
                      </Button>
                    </div>
                    <div className="flex justify-end">
                      <p className="text-xs text-[#8d8d8d]">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <NoList title="아직 받은 알림이 없어요 🦦" />
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Notification;
