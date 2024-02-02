'use client';

import React, { useEffect, useState } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import TitleCard from '@/components/Common/TitleCard';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Badge,
  Button,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import MyBadge from './components/MyBadge';
import {
  getBadgeData,
  getBookmarkData,
  getUserData,
  putNickname,
} from '../../service/userService';

const Page = () => {
  const queryClient = useQueryClient();
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: getUserData,
  });
  const { data: bookmarkData } = useQuery({
    queryKey: ['user', 'bookmark'],
    queryFn: getBookmarkData,
  });
  const { data: badgeData } = useQuery({
    queryKey: ['user', 'badge'],
    queryFn: getBadgeData,
  });

  const [oldNickname, setOldNickname] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [isNicknameChanging, setIsNicknameChanging] = useState(false);

  useEffect(() => {
    if (userData?.nickname) {
      setOldNickname(userData.nickname);
      setNewNickname(userData.nickname);

      console.log(userData.nickname);
    }
  }, [userData]);
  const toast = useToast();

  const mutation = useMutation<AxiosResponse, Error, string>({
    mutationFn: putNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });

      toast({
        title: '닉네임이 수정되었습니다.',
        status: 'success',
        isClosable: true,
      });
    },
    onError: (error: Error) => {
      console.error('닉네임 수정 실패 ', error);
    },
  });

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };
  const handleSaveNewNickname = async () => {
    setIsNicknameChanging(false);
    if (oldNickname === newNickname) {
      toast({
        title: '이미 사용한 닉네임과 같습니다.',
        status: 'error',
        isClosable: true,
      });
      return;
    }
    mutation.mutate(newNickname);
  };

  const handleClickChange = () => {
    setIsNicknameChanging(prev => {
      return !prev;
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  // NOTE 회원 탈퇴, 성공 시 메인페이지로 이동
  const handleQuit = async (): Promise<void> => {
    try {
      const response = await axios({
        method: 'DELETE',
        url: 'http://localhost:8080/api/members/me',
      });
      if (response.status === 200) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('회원 탈퇴 실패 ', error);
    } finally {
      onClose();
    }
  };
  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <TitleCard title="유저 정보">
          <div className="flex">
            <Avatar name={userData?.nickname} src={userData?.profileUrl} />
            <div className="flex flex-col gap-2 ml-4 ">
              <div>
                <h3 className="inline-block font-bold text-md">
                  {userData?.nickname ?? '닉네임 불러오기 실패'}
                </h3>
                <Badge ml="2" colorScheme="orange">
                  {userData?.socialType ?? '소셜 타입 불러오기 실패'}
                </Badge>
              </div>
              <div className="flex gap-5">
                <span className="flex text-sm items-center">이메일</span>
                <p className="text-sm">
                  {userData?.email ?? '이메일 불러오기 실패'}
                </p>
              </div>
              <div className="flex gap-5">
                <span className="flex text-sm items-center">닉네임</span>
                {isNicknameChanging ? (
                  <Input
                    defaultValue={newNickname}
                    onChange={handleChangeNickname}
                    placeholder="닉네임을 입력하세요."
                    width="md"
                    ml="2"
                    fontSize="sm"
                    size="sm"
                  />
                ) : (
                  <p className="text-sm self-center">
                    {userData?.nickname ?? '닉네임 불러오기 실패'}
                  </p>
                )}
                {isNicknameChanging ? (
                  <Button
                    bg="green.500"
                    color="white"
                    size="sm"
                    onClick={handleSaveNewNickname}
                    _hover={{ bg: 'green.600' }}
                  >
                    변경사항 저장
                  </Button>
                ) : (
                  <Button
                    bg="green.500"
                    color="white"
                    size="sm"
                    onClick={handleClickChange}
                    _hover={{ bg: 'green.600' }}
                  >
                    변경하기
                  </Button>
                )}
              </div>
            </div>
          </div>
        </TitleCard>
        <TitleCard title="북마크">
          <ul className="flex flex-row gap-3 flex-wrap">
            {bookmarkData?.bookmarks.map(bookmark => {
              return (
                // TODO 북마크 삭제 버튼 기능 넣기
                <li key={bookmark.bookmarkId}>
                  <Tag borderRadius="full" variant="solid" bg="accent.500">
                    <TagLabel fontSize="xs" fontWeight="bold">
                      <Link href={`/stars/${bookmark.documentId}`}>
                        {bookmark.title}
                      </Link>
                    </TagLabel>
                    <TagCloseButton />
                  </Tag>
                </li>
              );
            }) ?? '북마크 불러오기 실패'}
          </ul>
          {/* TODO 더보기 버튼 기능 넣기 */}
          <Button
            color="accent.500"
            variant="link"
            leftIcon={<IoIosArrowDown />}
            mt="2rem"
          >
            더보기
          </Button>
        </TitleCard>
        <TitleCard title="배지">
          <div className="flex flex-wrap gap-3">
            {badgeData?.badges.map(badge => {
              return (
                <MyBadge
                  title={badge.badgeTitle}
                  image={`/image/${badge.badgeType}.png`}
                  key={badge.badgeType}
                />
              );
            }) ?? '배지 불러오기 실패'}
          </div>
        </TitleCard>
        {/* TODO 위치, 디자인 고민하기 */}
        <Button
          variant="link"
          color="gray.500"
          rightIcon={<IoIosArrowForward />}
          size="xs"
          width="6rem"
          mt="1rem"
          _hover={{ color: 'red' }}
          onClick={onOpen}
        >
          회원 탈퇴
        </Button>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg">회원 탈퇴</AlertDialogHeader>
              <AlertDialogBody>
                정말로 탈퇴하실 건가요?🥺 <br />
                탈퇴할 경우 모든 데이터는 삭제되고 복구할 수 없습니다.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
                  취소
                </Button>
                <Button onClick={handleQuit} ml={3}>
                  탈퇴
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    </Wrapper>
  );
};

export default Page;
