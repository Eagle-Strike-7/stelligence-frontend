import { Heading } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { DM_Serif_Display } from 'next/font/google';

const dm = DM_Serif_Display({ subsets: ['latin'], weight: ['400'] });

// REVIEW - 나중에 다시 로고 폰트 확인하기
// const cinzel = Cinzel({ subsets: ['latin'] });

const Logo = () => {
    return (
        <div>
            <Link href="/">
                <Heading
                    className={`${dm.className} "text-white text-center align-middle tracking-wider font-extrabold`}
                    size="lg"
                    fontSize="2rem"
                >
                    Stelligence
                </Heading>
            </Link>
        </div>
    );
};

export default Logo;
