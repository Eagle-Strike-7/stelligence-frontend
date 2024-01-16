import React from 'react';
import Image from 'next/image';

const KakaoLogin = () => {
    return (
        <button type="button" className="w-60 h-15">
            <Image
                src="/image/kakaoLogin.png"
                alt="카카오 로그인 버튼"
                width={180}
                height={45}
                layout="responsive"
            />
        </button>
    );
};

export default KakaoLogin;
