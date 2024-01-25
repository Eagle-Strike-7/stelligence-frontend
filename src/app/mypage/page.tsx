'use client';

import React, { useEffect, useState } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import TitleCard from '@/components/Common/TitleCard';
import { Avatar, Badge, Button, Input, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
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
  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <TitleCard title="유저 정보">
          <div className="flex">
            <Avatar name={userData?.nickname} src={userData?.profileUrl} />
            <div className="flex flex-col gap-2 ml-4 ">
              <div>
                <h3 className="inline-block font-bold text-md">
                  {userData?.nickname}
                </h3>
                <Badge ml="2" colorScheme="orange">
                  {userData?.socialType}
                </Badge>
              </div>
              <div className="flex">
                <span className="flex text-sm items-center">이메일</span>
                <Input
                  isDisabled
                  defaultValue={userData?.email}
                  width="md"
                  ml="2"
                  fontSize="sm"
                  size="sm"
                  color="black"
                />
              </div>

              <div className="flex">
                <span className="flex text-sm items-center">닉네임</span>
                <Input
                  defaultValue={newNickname}
                  onChange={handleChangeNickname}
                  placeholder="닉네임을 입력하세요."
                  width="md"
                  ml="2"
                  fontSize="sm"
                  size="sm"
                />
                <Button
                  colorScheme="green"
                  size="sm"
                  ml="5"
                  onClick={handleSaveNewNickname}
                >
                  변경사항 저장
                </Button>
              </div>
            </div>
          </div>
        </TitleCard>
        <TitleCard title="북마크">
          <ul className="flex flex-col gap-1">
            {bookmarkData?.bookmarks.map(bookmark => {
              return (
                <li key={bookmark.bookmarkId}>
                  <Link
                    href={`/stars/${bookmark.documentId}`}
                    className="hover:underline"
                  >
                    {bookmark.title}
                  </Link>
                </li>
              );
            })}
          </ul>
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
            })}
          </div>
        </TitleCard>
      </div>
    </Wrapper>
  );
};

export default Page;
