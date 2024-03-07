"use client"

import { usePathname } from 'next/navigation';
import Header from '@/components/Header/Header';

const ConditionalHeader = () => {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    // NOTE 로그인 페이지가 아닌 경우에만 Header 렌더링
    if (isLoginPage) {
        return null;
    }

    return <Header />;
};

export default ConditionalHeader;
