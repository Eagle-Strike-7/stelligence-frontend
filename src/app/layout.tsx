import { Inter } from 'next/font/google';
import '../styles/globals.css';
import LoginInterceptor from '@/components/Login/LoginInterceptor';
import { Metadata } from 'next';
import QueryClientProviderComponent from './layout-components/QueryClient';
import ClientThemeProviders from './layout-components/ClientThemeProviders';
import ConditionalHeader from './layout-components/ConditionalHeader';
import RecoilRootProvider from './layout-components/RecoilRootProvider';
import InfoButton from './info/components/InfoButton';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  applicationName: 'Stelligence',
  title: 'Stelligence',
  description : '지식을 별처럼 연결해 탐색하는 사용자 참여형 지식 공유 플랫폼',
  keywords: ['지식', '별','글','수정', '그래프','투표','토론'],
  authors: [{ name: '서범석' },{ name: '이영민' },{ name: '이은지' }, { name: '황한나' },{ name: '문지원' },{ name: '이다희' },{ name: '정나리' , url:'https://www.github.com/naringst'},],
  creator: 'Eagle-Strike-7',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <html lang="ko">
      <body className={`${inter.className} bg-background-dark`}>
        <QueryClientProviderComponent>
          <ClientThemeProviders>  
            <RecoilRootProvider>             
              <LoginInterceptor />
              <ConditionalHeader />
              <InfoButton />
              {children}
            </RecoilRootProvider>
          </ClientThemeProviders>
        </QueryClientProviderComponent>
      </body>
    </html>
  );
};

export default RootLayout;
