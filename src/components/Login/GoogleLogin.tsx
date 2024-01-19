import Image from 'next/image';
import React from 'react';

const GoogleLogin = () => {
    return (
        <button
            type="button"
            className="flex item-center p-3 w-60 h-15 rounded-xl border border-gray-400 bg-white"
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
