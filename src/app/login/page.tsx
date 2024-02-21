'use client';

import GoogleLogin from '@/app/login/components/GoogleLogin';
import KakaoLogin from '@/app/login/components/KakaoLogin';
import NaverLogin from '@/app/login/components/NaverLogin';
import { Card } from '@chakra-ui/react';
import { DM_Serif_Display } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLatestLogin } from '@/service/login/latestLogin';
import styles from '../../styles/login.module.css';

const dm = DM_Serif_Display({ subsets: ['latin'], weight: ['400'] });

const Page = () => {
  const [latestLogin, setLatestLogin] = useState<string | undefined>('');
  useEffect(() => {
    const latestLoginString = getLatestLogin()?.replaceAll('"', '');
    if (latestLoginString !== 'undefined' && latestLoginString !== undefined) {
      setLatestLogin(latestLoginString);
    }
  }, []);

  // NOTE 테스트를 위한 로직.

  // const router = useRouter();
  // const [nickname, setNickname] = useState('');
  // const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNickname(e.target.value);
  // };
  // const handleSubmitNickname = async () => {
  //   try {
  //     const response = await axios({
  //       method: 'POST',
  //       url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/login`,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       data: {
  //         nickname,
  //       },
  //       withCredentials: true,
  //     });

  //     // NOTE 닉네임으로 로그인 성공 시 메인페이지로 이동
  //     if (response.status === 200) {
  //       console.log('로그인 성공', response);
  //       router.push('/');
  //     }
  //   } catch (error) {
  //     throw new Error('닉네임 로그인 실패');
  //   }
  // };
  return (
    <div className="flex flex-col gap-y-8 justify-center items-center h-screen bg-background-dark">
      <Link href="/">
        <h1
          className={`${dm.className} text-4xl text-white text-left align-middle justify-center tracking-wider font-extrabold`}
        >
          Stelligence
        </h1>
      </Link>
      <Card px="12" pt="12" pb="16" borderRadius="lg" bgColor="#303134">
        <h1 className="text-center font-bold mb-8 text-2xl text-white">
          로그인
        </h1>
        <div className="flex flex-col gap-y-3">
          {['KAKAO', 'NAVER', 'GOOGLE'].map(method => {
            return (
              <div className="relative" key={method}>
                {latestLogin === method && (
                  <div className={styles.latestLoginLabel}>
                    <div className={styles.triangle} />
                    <div className="bg-black text-white rounded w-fit px-4 py-2 text-xs font-bold">
                      마지막으로 로그인했어요
                    </div>
                  </div>
                )}
                {method === 'KAKAO' && <KakaoLogin />}
                {method === 'NAVER' && <NaverLogin />}
                {method === 'GOOGLE' && <GoogleLogin />}
              </div>
            );
          })}
        </div>
      </Card>

      {/* NOTE 테스트용 닉네임으로 로그인 */}
      {/* TODO 최종에서는 삭제 */}
      {/* <Card p="2rem">
        <Input
          placeholder="[test] 닉네임으로 로그인"
          width="sm"
          mb="1rem"
          onChange={handleChangeInput}
        />
        <Button onClick={handleSubmitNickname}>로그인</Button>
      </Card> */}
    </div>
  );
};

export default Page;
