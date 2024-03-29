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
import { AxiosError, AxiosResponse } from 'axios';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { removeLoginStateLocalStorage } from '@/service/login/loginState';
import { ErrorResponse } from '@/types/common/ResponseType';
import PageTitleDescription from '@/components/Common/Title/PageTitleDescription';
import NoList from '@/components/Common/NoList';
import {
  BookmarkData,
  deleteBookmarkData,
  deleteUserData,
  getBadgeData,
  getBookmarkDatas,
  getUserData,
  putNickname,
} from '../../service/userService';
import MyBadge from './components/MyBadge';

const Page = () => {
  const queryClient = useQueryClient();
  const [currentBookmarkPage, setCurrentBookmarkPage] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: getUserData,
  });
  const { data: bookmarkData } = useQuery({
    queryKey: ['user', 'bookmark', currentBookmarkPage],
    queryFn: () => {
      return getBookmarkDatas(currentBookmarkPage);
    },
  });

  const { data: badgeData } = useQuery({
    queryKey: ['user', 'badge'],
    queryFn: getBadgeData,
  });

  const [oldNickname, setOldNickname] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [isNicknameChanging, setIsNicknameChanging] = useState(false);

  useEffect(() => {
    if (userData?.results.nickname) {
      setOldNickname(userData?.results.nickname);
      setNewNickname(userData?.results.nickname);
    }
  }, [userData]);

  useEffect(() => {
    if (currentBookmarkPage === 0) {
      setBookmarks(bookmarkData?.results.bookmarks || []);
    } else {
      setBookmarks(prevBookmarks => {
        const newBookmarks = bookmarkData?.results.bookmarks || [];
        const updatedBookmarks = newBookmarks.filter(newBookmark => {
          return !prevBookmarks.some(prevBookmark => {
            return prevBookmark.documentId === newBookmark.documentId;
          });
        });
        return [...prevBookmarks, ...updatedBookmarks];
      });
    }
    setHasNextPage(bookmarkData?.results.hasNext || false);
  }, [bookmarkData?.results.bookmarks, currentBookmarkPage]);

  const toast = useToast();

  const nicknameMutation = useMutation<
    AxiosResponse,
    AxiosError<ErrorResponse<string>>,
    string
  >({
    mutationFn: putNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });

      toast({
        title: '닉네임이 수정되었습니다.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error: AxiosError<ErrorResponse<string>>) => {
      console.error('닉네임 수정 실패 ', error);
      if (
        error.response?.data.message.startsWith('이미 사용 중인 닉네임입니다.')
      ) {
        toast({
          title: '닉네임 수정 실패',
          description: '중복된 닉네임입니다. 다른 닉네임을 입력하세요.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    },
  });

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value.trim());
  };

  const handleSaveNewNickname = async () => {
    setIsNicknameChanging(false);
    if (newNickname.length > 15) {
      toast({
        title: '닉네임은 최대 15자까지 가능합니다.',
        status: 'error',
        isClosable: true,
      });
      return;
    }
    if (oldNickname === newNickname) {
      toast({
        title: '현재 닉네임과 동일합니다.',
        description: '앞 뒤 공백은 포함되지 않습니다',
        status: 'error',
        isClosable: true,
      });
      return;
    }
    nicknameMutation.mutate(newNickname);
  };

  const handleClickChange = () => {
    setIsNicknameChanging(prev => {
      return !prev;
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // NOTE 회원 탈퇴, 성공 시 메인페이지로 이동
  const quitMutation = useMutation<AxiosResponse, Error>({
    mutationFn: deleteUserData,
    onSuccess: () => {
      router.push('/');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      removeLoginStateLocalStorage();
      onClose();

      toast({
        title: '회원탈퇴 완료! 다음에 다시 만나요👋',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    },
    onError: (error: Error) => {
      console.error('회원탈퇴 실패: ', error);

      onClose();
      toast({
        title: '회원탈퇴 실패',
        status: 'error',
        isClosable: true,
      });
    },
  });

  // NOTE 북마크 삭제 mutation
  const deleteBookmarkMutation = useMutation({
    mutationFn: deleteBookmarkData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'bookmark'] });
      toast({
        title: '북마크 취소',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    onError: error => {
      console.error('북마크 삭제 실패: ', error);
    },
  });

  const handleQuit = () => {
    quitMutation.mutate();
  };

  const handleClickMoreBookmark = () => {
    setCurrentBookmarkPage(prev => {
      return prev + 1;
    });
  };

  const handleDeleteBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget as HTMLButtonElement;
    const documentId = button.dataset.documentid;
    deleteBookmarkMutation.mutate(Number(documentId));
  };

  return (
    <Wrapper>
      <PageTitleDescription
        title="마이페이지"
        description="Stelligence 탐험 기록 🧑‍🚀"
      />
      <div className="flex flex-col gap-8">
        <TitleCard title="유저 정보">
          <div className="flex">
            <Avatar
              name={userData?.results.nickname}
              src={userData?.results.profileImgUrl}
            />
            <div className="flex flex-col gap-2 ml-4 ">
              <div>
                <h3 className="inline-block font-bold text-md">
                  {userData?.results.nickname ?? '닉네임 불러오기 실패'}
                </h3>
                <Badge ml="2" colorScheme="orange">
                  {userData?.results.socialType ?? '소셜 타입 불러오기 실패'}
                </Badge>
              </div>
              <div className="flex gap-5">
                <span className="flex text-sm items-center">이메일</span>
                <p className="text-sm">
                  {userData?.results.email ?? '이메일 불러오기 실패'}
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
                    {userData?.results.nickname ?? '닉네임 불러오기 실패'}
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
            {bookmarks.length !== 0 ? (
              bookmarks.map(bookmark => {
                console.log('북마크 있어요');

                return (
                  // TODO 북마크 삭제 버튼 기능 넣기
                  <li key={bookmark.documentId}>
                    <Tag
                      borderRadius="full"
                      variant="solid"
                      bg="rgba(118, 147, 231,0.5)"
                      color="white"
                    >
                      <TagLabel fontSize="sm" fontWeight="bold">
                        <Link href={`/stars/${bookmark.documentId}`}>
                          {bookmark.documentTitle}
                        </Link>
                      </TagLabel>
                      <TagCloseButton
                        data-documentid={bookmark.documentId}
                        onClick={handleDeleteBookmark}
                      />
                    </Tag>
                  </li>
                );
              })
            ) : (
              <div className="mx-auto">
                <NoList
                  title="목록이 없습니다🔖"
                  description="북마크를 추가해보세요!"
                />
              </div>
            )}
          </ul>
          {hasNextPage && (
            <Button
              color="white"
              variant="link"
              leftIcon={<IoIosArrowDown />}
              mt="2rem"
              onClick={handleClickMoreBookmark}
            >
              더보기
            </Button>
          )}
        </TitleCard>
        <TitleCard title="배지">
          <div className="flex flex-wrap gap-3">
            {badgeData?.results.badges.length !== 0 ? (
              badgeData?.results.badges.map(badge => {
                return (
                  <MyBadge
                    key={badge.badgeType}
                    title={badge.badgeTitle}
                    image={`${process.env.NEXT_PUBLIC_SERVER_URL}${badge.badgeImgUrl}`}
                    description={badge.badgeDescription}
                  />
                );
              })
            ) : (
              <div className="mx-auto">
                <NoList
                  title="배지가 없습니다☄️"
                  description="글이나 수정요청을 작성해 배지를 획득하세요!"
                />
              </div>
            )}
          </div>
        </TitleCard>
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
