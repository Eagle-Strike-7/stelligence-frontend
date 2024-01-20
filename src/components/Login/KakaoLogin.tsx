'use client';

import React from 'react';
import Image from 'next/image';

const KakaoLogin = () => {
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
    const handleClick = () => {
        window.location.href = link;
    };
    return (
        <button type="button" className="w-60 h-15" onClick={handleClick}>
            <Image
                src="/image/kakaoLogin.png"
                alt="카카오 로그인 버튼"
                width={240}
                height={60}
            />
        </button>
    );
};

export default KakaoLogin;
