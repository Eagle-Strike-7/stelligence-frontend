import GoogleLogin from '@/components/Login/GoogleLogin';
import KakaoLogin from '@/components/Login/KakaoLogin';
import NaverLogin from '@/components/Login/NaverLogin';
import { Box } from '@chakra-ui/react';
import { Lobster } from 'next/font/google';
import React from 'react';

const lobster = Lobster({
    weight: '400',
    subsets: ['latin'],
});

const page = () => {
    return (
        <div className="flex flex-col gap-y-8 justify-center items-center h-screen">
            <h1 className={`${lobster.className} text-5xl`}>Stelligence</h1>
            <Box
                style={{
                    borderWidth: '1px',
                    borderColor: 'gray.300',
                    padding: '5rem',
                    borderRadius: '0.375rem',
                }}
            >
                <div className="flex flex-col gap-y-3">
                    <KakaoLogin />
                    <NaverLogin />
                    <GoogleLogin />
                </div>
            </Box>
        </div>
    );
};

export default page;
