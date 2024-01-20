import Link from 'next/link';
import React from 'react';
import { DM_Serif_Display } from 'next/font/google';

const dm = DM_Serif_Display({ subsets: ['latin'], weight: ['400'] });

// REVIEW - 나중에 다시 로고 폰트 확인하기
// const cinzel = Cinzel({ subsets: ['latin'] });

const Logo = () => {
  return (
    <div className="flex w-40">
      <Link href="/">
        <h1
          className={`${dm.className} text-3xl text-white text-left align-middle justify-center tracking-wider font-extrabold`}
        >
          Stelligence
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
