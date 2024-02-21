import { setLatestLogin } from '@/service/login/latestLogin';
import postLogout from '@/service/login/logout';
import { getUserData } from '@/service/userService';
import { loggedInUserState, loginState } from '@/store/user/login';
import { ResponseType } from '@/types/common/ResponseType';
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  removeLoginStateLocalStorage,
  setLoginStateLocalStorage,
} from '@/service/login/loginState';
import { BiBell } from 'react-icons/bi';
import countNotification from '@/store/notification/countNotification';
import Notification from './Notification';

const RightNav = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const setLoggedInUserState = useSetRecoilState(loggedInUserState);
  const notificationCount = useRecoilValue(countNotification);

  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

  // NOTE 회원정보 요청
  const {
    data: userData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUserData,
    retry: false,
    staleTime: Infinity,
  });

  // NOTE 회원정보 데이터 변경 시 로그인 전역상태 변경
  useEffect(() => {
    setIsLogin({ isLoggedIn: !!userData?.success, isLoading: false });

    setLoggedInUserState({
      memberId: userData?.results.memberId ?? 0,
      email: userData?.results.email ?? '',
      nickname: userData?.results.nickname ?? '',
      profileImgUrl: userData?.results.profileImgUrl ?? '',
    });
    if (
      userData?.results.socialType !== 'undefined' &&
      userData?.results.socialType !== undefined
    ) {
      setLatestLogin(userData?.results.socialType);
    }
  }, [userData?.results]);

  useEffect(() => {
    setLoginStateLocalStorage(true);
  }, []);

  // NOTE 로그아웃 요청
  const logoutMutation = useMutation<ResponseType<{}>, Error>({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      removeLoginStateLocalStorage();
      setIsLogin({ isLoggedIn: false, isLoading: false });

      // NOTE 로그아웃 성공 시 login atom에 null 값 지정 & 메인페이지 이동
      router.push('/');
      toast({
        title: '로그아웃에 성공했습니다.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error: Error) => {
      console.error('로그아웃 실패: ', error);
      toast({
        title: '로그아웃에 실패했습니다. 다시 시도해주세요.',
        status: 'error',
        isClosable: true,
      });
    },
  });

  // NOTE 유저 메뉴 열기
  const handleOpenUserMenu = () => {
    onUserMenuOpen();
  };

  // NOTE 마이페이지로 이동
  const handleClickMypage = () => {
    onUserMenuClose();
    router.push('/mypage');
  };
  // NOTE 로그아웃 mutation 함수 호출
  const handleLogout = () => {
    onUserMenuClose();
    logoutMutation.mutate();
  };

  // FIXME 임시 내용, 추후 폴백 컨텐츠로 변경
  if (isError) {
    console.log('error');
  }
  if (isLoading) {
    console.log('loading');
  }

  // NOTE 로그인 버튼
  const handleClickLogin = () => {
    router.push('/login');
  };

  // NOTE 유저 정보 모달
  const [userModalPosition, setUserModalPosition] = useState({
    top: 0,
    left: 0,
  });
  const userButtonRef = useRef<HTMLButtonElement>(null);
  const {
    isOpen: isUserMenuOpen,
    onOpen: onUserMenuOpen,
    onClose: onUserMenuClose,
  } = useDisclosure();
  useEffect(() => {
    if (isUserMenuOpen && userButtonRef.current) {
      const userButtonRect = userButtonRef.current.getBoundingClientRect();
      setUserModalPosition({
        top: userButtonRect.bottom - 55,
        left: userButtonRect.left - 130,
      });
    }
  }, [isUserMenuOpen]);

  // NOTE 알림 모달
  const [notiModalPosition, setNotiModalPosition] = useState({
    top: 0,
    left: 0,
  });
  const notiButtonRef = useRef<HTMLButtonElement>(null);

  const {
    isOpen: isNotificationOpen,
    onOpen: onNotificationOpen,
    onClose: onNotificationClose,
  } = useDisclosure();

  useEffect(() => {
    if (isNotificationOpen && notiButtonRef.current) {
      const notiButtonRect = notiButtonRef.current.getBoundingClientRect();
      setNotiModalPosition({
        top: notiButtonRect.bottom - 64,
        left: notiButtonRect.left - 270,
      });
    }
  }, [isNotificationOpen]);

  return (
    <div className="flex mobile:mr-4 desktop:mr-20 ml-3">
      {/* NOTE 로그인 상태라면 미니프로필 & 로그아웃 버튼, 아니라면 로그인 버튼 */}
      {userData && isLogin.isLoggedIn ? (
        <div className="flex flex-row gap-0">
          <Button
            onClick={onNotificationOpen}
            bgColor="transparent"
            color="white"
            fontSize="2xl"
            size="sm"
            _hover={{
              bgColor: 'transparent',
            }}
            ref={notiButtonRef}
            position="relative"
          >
            <BiBell />
            {notificationCount.hasNotRead && (
              <div className="rounded-full bg-secondary-dark-500 w-1.5 h-1.5 absolute top-2 right-4 flex z-10" />
            )}
          </Button>
          <Notification
            isOpen={isNotificationOpen}
            onClose={onNotificationClose}
            position={notiModalPosition}
          />
          <Button
            variant="link"
            gap={2}
            color="white"
            alignSelf="center"
            position="relative"
            ref={userButtonRef}
            onClick={handleOpenUserMenu}
          >
            <Avatar
              name={userData?.results.nickname}
              src={userData?.results.profileImgUrl}
              size="sm"
            />
          </Button>
          <Modal onClose={onUserMenuClose} isOpen={isUserMenuOpen}>
            <ModalOverlay bgColor="transparent" />
            <ModalContent
              position="absolute"
              top={`${userModalPosition.top}px`}
              left={`${userModalPosition.left}px`}
              bgColor="#2e2e2e"
              width="11rem"
              borderWidth={2}
              borderColor="#292929"
              rounded="lg"
            >
              <ModalHeader paddingX="1rem" paddingY="0.5rem">
                <div className="flex flex-row gap-2 items-center">
                  <Avatar
                    name={userData?.results.nickname}
                    src={userData?.results.profileImgUrl}
                    size="xs"
                  />
                  <h4 className="text-white text-sm text-center">
                    <span className="text-primary-dark-200">
                      {userData.results.nickname}
                    </span>{' '}
                    님 👋
                  </h4>
                </div>
              </ModalHeader>
              <ModalBody paddingX="1rem">
                <div className="flex flex-col gap-3 items-start">
                  <Button
                    variant="link"
                    size="sm"
                    color="white"
                    borderBottom="1"
                    borderColor="white"
                    leftIcon={<FaUser />}
                    onClick={handleClickMypage}
                  >
                    마이페이지
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    color="white"
                    leftIcon={<AiOutlineLogout />}
                    onClick={handleLogout}
                  >
                    지구로 돌아가기
                  </Button>
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      ) : (
        <div>
          <Tooltip
            hasArrow
            arrowSize={10}
            label="우주로 출발하기🚀"
            placement="bottom"
            color="black"
            backgroundColor="#f6f6f6"
            size="lg"
            padding="0.25rem 0.75rem"
            rounded="sm"
          >
            <Button
              bgColor="transparent"
              color="white"
              _hover={{
                bgColor: 'transparent',
                color: 'white',
              }}
              onClick={handleClickLogin}
            >
              <AiOutlineLogin size="24px" />
            </Button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default RightNav;
