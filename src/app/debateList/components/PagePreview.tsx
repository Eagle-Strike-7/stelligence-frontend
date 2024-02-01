import React from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import Link from 'next/link';

const PagePreview = () => {
  return (
    <div className="flex flex-row gap-5 mb-5">
      <Link href="/debateList">
        <div className="flex flex-row align-center place-items-center">
          <HiOutlineChevronLeft />
          <span className="text-md font-bold ">이전 토론</span>
        </div>
      </Link>
      <Link href="/debateList">
        <div className="flex flex-row place-items-center">
          <span className=" text-md font-bold text-right">다음 토론</span>
          <HiOutlineChevronRight />
        </div>
      </Link>
    </div>
  );
};

export default PagePreview;
