import Wrapper from '@/components/Common/Wrapper';
import React from 'react';

const LoadingComponent = () => {
  const loadingImages = [
    '/image/loading1.svg',
    '/image/loading2.svg',
    '/image/loading3.svg',
    '/image/loading5.svg',
    '/image/loading6.svg',
    '/image/loading7.svg',
    '/image/loading13.svg',
    '/image/loading14.svg',
  ];

  console.log(loadingImages[Math.floor(Math.random() * loadingImages.length)]);

  return (
    <Wrapper>
      <div className="flex flex-col mx-auto align-middle gap-10">
        <div className="flex mx-auto mt-48">
          <img
            src={
              loadingImages[Math.floor(Math.random() * loadingImages.length)]
            }
            alt="로딩 컨텐츠"
            className="w-80 "
          />
        </div>
        <div className="flex mx-auto">
          <p className="text-white font-extrabold text-2xl">
            별 보러 가는 중 ... ✨
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoadingComponent;
