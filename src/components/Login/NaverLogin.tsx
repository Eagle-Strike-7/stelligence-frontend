'use client';

import Image from 'next/image';
import React from 'react';

const NaverLogin = () => {
    const link = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&state=STATE_STRING&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}`;
    const handleClick = () => {
        window.location.href = link;
    };
    return (
        <button
            type="button"
            className="flex w-60 h-15 rounded-lg bg-naver-light"
            onClick={handleClick}
        >
            <Image
                src="/image/naverLogo.png"
                alt="네이버 로그인 버튼"
                width={60}
                height={60}
            />
            <p className="m-auto pr-5 text-xl text-white">네이버 로그인</p>
        </button>
    );
};

export default NaverLogin;
