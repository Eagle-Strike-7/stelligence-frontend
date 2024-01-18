'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header/Header';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import muiTheme from '@/theme/mui';
import customTheme from '../theme/index';

const inter = Inter({ subsets: ['latin'] });

// NOTE : 화살표 함수 형식으로 변경된 RootLayout 컴포넌트
const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const isLoginPage = pathname === '/login';

    return (
        <html lang="ko">
            <body className={inter.className}>
                <ChakraProvider theme={customTheme}>
                    <MUIThemeProvider theme={muiTheme}>
                        {!isLoginPage && <Header />}
                        {children}
                    </MUIThemeProvider>
                </ChakraProvider>
            </body>
        </html>
    );
};

export default RootLayout;
