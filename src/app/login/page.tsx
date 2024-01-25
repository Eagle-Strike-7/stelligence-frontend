'use client';

import Wrapper from '@/components/Common/Wrapper';
import GoogleLogin from '@/app/login/components/GoogleLogin';
import KakaoLogin from '@/app/login/components/KakaoLogin';
import NaverLogin from '@/app/login/components/NaverLogin';
import { Button, Card, Input } from '@chakra-ui/react';
import { DM_Serif_Display } from 'next/font/google';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const dm = DM_Serif_Display({ subsets: ['latin'], weight: ['400'] });

const Page = () => {
  // NOTE 테스트를 위한 로직.
  // TODO 최종에서는 삭제
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleSubmitNickname = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:8080/api/login',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          nickname,
        },
      });

      // NOTE 닉네임으로 로그인 성공 시 메인페이지로 이동
      if (response.status === 200) {
        router.push('/');
      }
    } catch (error) {
      throw new Error('닉네임 로그인 실패');
    }
  };
  return (
    <Wrapper>
      <div className="flex flex-col gap-y-8 justify-center items-center h-screen">
        <h1 className={`${dm.className} text-4xl`}>Stelligence</h1>
        <Card
          borderWidth="1px"
          borderColor="requestBtn"
          p="20"
          borderRadius="lg"
          bgColor="white"
        >
          <div className="flex flex-col gap-y-3">
            <KakaoLogin />
            <NaverLogin />
            <GoogleLogin />
          </div>
        </Card>

        {/* NOTE 테스트용 닉네임으로 로그인 */}
        {/* TODO 최종에서는 삭제 */}
        <Card p="2rem">
          <Input
            placeholder="[test] 닉네임으로 로그인"
            width="sm"
            mb="1rem"
            onChange={handleChangeInput}
          />
          <Button onClick={handleSubmitNickname}>로그인</Button>
        </Card>
      </div>
    </Wrapper>
  );
};

export default Page;
