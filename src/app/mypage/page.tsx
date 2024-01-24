'use client';

import React, { useState } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import TitleCard from '@/components/Common/TitleCard';
import { Avatar, Badge, Button, Input, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import MyBadge from './components/MyBadge';
import dummyUserData from '../../constants/dummyUserData.json';
import dummyBookmarkData from '../../constants/dummyBookmarkData.json';
import dummyBadgeData from '../../constants/dummyBadgeData.json';
import { putNickname } from '../../service/userService';

const Page = () => {
  // TODO 백엔드 데이터 받아온 뒤 initNickname 값 변경
  const initNickname = dummyUserData.nickname;
  const [newNickname, setNewNickname] = useState(initNickname);
  const toast = useToast();

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };
  const handleSaveNewNickname = async () => {
    if (initNickname === newNickname) {
      toast({
        title: '이미 사용한 닉네임과 같습니다.',
        status: 'error',
        isClosable: true,
      });
      return;
    }

    // TODO react query로 수정
    const response = putNickname(newNickname);

    if ((await response).status === 400) {
      toast({
        title: '이미 사용 중인 닉네임입니다.',
        status: 'error',
        isClosable: true,
      });
    } else if ((await response).status === 200) {
      toast({
        title: '닉네임이 수정되었습니다.',
        status: 'success',
        isClosable: true,
      });
    }
  };
  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <TitleCard title="유저 정보">
          <div className="flex">
            <Avatar
              name={dummyUserData.nickname}
              src={dummyUserData.profileUrl}
            />
            <div className="flex flex-col gap-2 ml-4 ">
              <div>
                <h3 className="inline-block font-bold text-md">
                  {dummyUserData.nickname}
                </h3>
                <Badge ml="2" colorScheme="orange">
                  {dummyUserData.socialType}
                </Badge>
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
            {dummyBookmarkData.bookmarks.map(bookmark => {
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
            {dummyBadgeData.badges.map(badge => {
              return (
                <MyBadge
                  title={badge.badgeTitle}
                  image={`/image/${badge.badgeType}.jpg`}
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
