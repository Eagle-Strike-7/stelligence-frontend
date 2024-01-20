'use client';

import Image from 'next/image';
import React from 'react';

const GoogleLogin = () => {
    const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
    const handleClick = () => {
        window.location.href = link;
    };
    return (
        <button
            type="button"
            className="flex item-center p-3 w-60 h-15 rounded-xl border border-gray-400 bg-white"
            onClick={handleClick}
        >
            <Image
                src="/image/googleLogo.png"
                alt="구글 로고"
                width={35}
                height={35}
                className="object-contain"
            />
            <p className="m-auto text-xl">구글로 로그인</p>
        </button>
    );
};

export default GoogleLogin;
