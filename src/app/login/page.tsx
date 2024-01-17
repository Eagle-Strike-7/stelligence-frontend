import GoogleLogin from '@/components/Login/GoogleLogin';
import KakaoLogin from '@/components/Login/KakaoLogin';
import NaverLogin from '@/components/Login/NaverLogin';
import { Box } from '@chakra-ui/react';
import React from 'react';

const page = () => {
    return (
        <div className="">
            <Box>
                <div className="">
                    <KakaoLogin />
                    <NaverLogin />
                    <GoogleLogin />
                </div>
            </Box>
        </div>
    );
};

export default page;
