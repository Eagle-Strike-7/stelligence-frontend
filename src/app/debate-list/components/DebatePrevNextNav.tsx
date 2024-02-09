import React from 'react';
import Link from 'next/link';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

const PrevNextNav = () => {
  return (
    <div className="flex flex-row gap-5 mb-5 justify-end ">
      <Link href="/debate-list">
        <div className="flex flex-row align-center  place-items-center">
          <HiOutlineChevronLeft />
        </div>
      </Link>
      <Link href="/debate-list">
        <div className="flex flex-row place-items-center">
          <HiOutlineChevronRight />
        </div>
      </Link>
    </div>
  );
};

export default PrevNextNav;
