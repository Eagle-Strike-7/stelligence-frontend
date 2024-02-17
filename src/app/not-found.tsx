import Wrapper from '@/components/Common/Wrapper';
import React from 'react';

const NotFoundPage = () => {
  return (
    <Wrapper>
      <div className="w-3/5 flex flex-col mx-auto h-full -my-10">
        <img src="image/404-Error-bg-none.svg" alt="404 page" />
      </div>
    </Wrapper>
  );
};

export default NotFoundPage;
