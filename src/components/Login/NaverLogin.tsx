import Image from 'next/image';
import React from 'react';

const NaverLogin = () => {
    return (
        <button
            type="button"
            className="flex w-60 h-15 rounded-lg bg-naver-light"
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
