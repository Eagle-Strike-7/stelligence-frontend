import postLogout from '@/service/login/logout';
import { getMiniProfile } from '@/service/userService';
import { loginState } from '@/store/user/login';
import deleteCookie from '@/store/user/withdrawal';
import { Avatar, Button, Tooltip, useToast } from '@chakra-ui/react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { HiOutlinePencil } from 'react-icons/hi';
import { useRecoilState } from 'recoil';

const RightNav = () => {
  const [isLogin] = useRecoilState(loginState);
  console.log('header의 현재 로그인 상태: ', isLogin);

  const router = useRouter();
  const toast = useToast();

  // NOTE 미니프로필 요청
  const {
    data: miniProfileData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['user', 'mini'],
    queryFn: getMiniProfile,
  });

  // NOTE 로그아웃 요청
  const logoutMutation = useMutation<AxiosResponse, Error>({
    mutationFn: postLogout,
    onSuccess: response => {
      console.log('로그아웃 성공: ', response.data);

      // NOTE 로그아웃 성공 시 login atom에 null 값 지정 & 메인페이지 이동
      // TODO 쿠키 삭제
      // setIsLogin({ email: '', nickname: '', profileImgUrl: '' });
      deleteCookie(
        'StelligenceAccessToken',
        '/',
        process.env.NEXT_PUBLIC_SERVER_URL,
      );
      deleteCookie(
        'StelligenceRefreshToken',
        '/',
        process.env.NEXT_PUBLIC_SERVER_URL,
      );
      router.push('/');
      toast({
        title: '로그아웃에 성공했습니다.',
        status: 'success',
        isClosable: true,
      });
    },
    onError: (error: Error) => {
      console.error('로그아웃 실패: ', error);
      console.log();
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
            variant="link"
            gap={2}
            color="white"
            alignSelf="center"
            onClick={handleClickMypage}
          >
            <Avatar
              name={miniProfileData?.results.nickname}
              src={miniProfileData?.results.profileImgUrl}
              size="xs"
            />
            <h3 className="text-sm self-center">
              {miniProfileData?.results.nickname}
            </h3>
          </Button>
          <div>
            <Tooltip
              hasArrow
              // defaultIsOpen
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
