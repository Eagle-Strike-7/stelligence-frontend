import { setLatestLogin } from '@/service/login/latestLogin';
import postLogout from '@/service/login/logout';
import { getUserData } from '@/service/userService';
import { loggedInUserState, loginState } from '@/store/user/login';
import { ResponseType } from '@/types/common/ResponseType';
import {
  Avatar,
  Button,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { FaBell } from 'react-icons/fa';
import { HiOutlinePencil } from 'react-icons/hi';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Notification from './Notification';

const RightNav = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const setLoggedInUserState = useSetRecoilState(loggedInUserState);

  const router = useRouter();
  const toast = useToast();

  // NOTE 회원정보 요청
  const {
    data: userData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUserData,
    retry: false,
  });

  // NOTE 미니프로필 데이터 변경 시 로그인 전역상태 변경
  useEffect(() => {
    setIsLogin(!!userData?.success);
    setLoggedInUserState({
      email: userData?.results.email ?? '',
      nickname: userData?.results.nickname ?? '',
      profileImgUrl: userData?.results.profileImgUrl ?? '',
    });
    setLatestLogin(userData?.results.socialType);
  }, [userData]);

  // NOTE 로그아웃 요청
  const logoutMutation = useMutation<ResponseType<{}>, Error>({
    mutationFn: postLogout,
    onSuccess: response => {
      console.log('로그아웃 성공: ', response.success);
      setIsLogin(false);

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

  // NOTE 마이페이지로 이동
  const handleClickMypage = () => {
    router.push('/mypage');
  };
  // NOTE 로그아웃 mutation 함수 호출
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // FIXME 임시 내용, 추후 폴백 컨텐츠로 변경
  if (isError) {
    console.log('error');
  }
  if (isLoading) {
    console.log('loading');
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="flex mr-20 w-40 justify-end place-items-center">
      <div className="inline mr-4">
        <Link href="/new-star">
          <Button
            leftIcon={<HiOutlinePencil size="20px" />}
            variant="ghost"
            textColor="white"
            _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
            cursor="pointer"
            size="sm"
            rounded="sm"
          >
            <h2 className="text-md text-semibold">별생성</h2>
          </Button>
        </Link>
      </div>

      {/* NOTE 로그인 상태라면 미니프로필 & 로그아웃 버튼, 아니라면 로그인 버튼 */}
      {isLogin ? (
        <div className="flex flex-row gap-4">
          <Button
            onClick={onOpen}
            bgColor="transparent"
            color="white"
            _hover={{
              bgColor: 'transparent',
            }}
          >
            <FaBell />
          </Button>
          <Notification isOpen={isOpen} onClose={onClose} />
          <Button
            variant="link"
            gap={2}
            color="white"
            alignSelf="center"
            onClick={handleClickMypage}
          >
            <Avatar
              name={userData?.results.nickname}
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${userData?.results.profileImgUrl}`}
              size="xs"
            />
            <h3 className="text-sm self-center">
              {userData?.results.nickname}
            </h3>
          </Button>
          <Tooltip
            hasArrow
            arrowSize={10}
            label="지구로 돌아가기🌍"
            placement="right"
            color="black"
            backgroundColor="#f6f6f6"
            size="lg"
            padding="0.25rem 0.75rem"
            rounded="sm"
          >
            <Button
              variant="link"
              color="white"
              alignSelf="center"
              onClick={handleLogout}
            >
              <AiOutlineLogout className="w-6 h-6" />
            </Button>
          </Tooltip>
        </div>
      ) : (
        <div>
          <Tooltip
            hasArrow
            defaultIsOpen
            arrowSize={10}
            label="우주로 출발하기🚀"
            placement="right"
            color="black"
            backgroundColor="#f6f6f6"
            size="lg"
            padding="0.25rem 0.75rem"
            rounded="sm"
          >
            <Link href="/login">
              <AiOutlineLogin className="w-6 h-6" />
            </Link>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default RightNav;
