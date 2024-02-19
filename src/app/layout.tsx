'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header/Header';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import muiTheme from '@/theme/mui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import LoginInterceptor from '@/components/Login/LoginInterceptor';
import customTheme from '../theme/chakra';
import InfoButton from './info/components/InfoButton';

const inter = Inter({ subsets: ['latin'] });
const queryClient = new QueryClient();

// NOTE : 화살표 함수 형식으로 변경된 RootLayout 컴포넌트
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';

  return (
    <html lang="ko">
      <body className={`${inter.className} bg-background-dark`}>
        <QueryClientProvider client={queryClient}>
          <MUIThemeProvider theme={muiTheme}>
            <ChakraProvider theme={customTheme}>
              <RecoilRoot>
                <LoginInterceptor />
                {!isLoginPage && <Header />}
                <InfoButton />
                {children}
              </RecoilRoot>
            </ChakraProvider>
          </MUIThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
