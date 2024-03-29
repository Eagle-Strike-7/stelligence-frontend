'use client';

import React, { useRef, useState } from 'react';
import useOutsideClick from '@/hooks/common/useOutsideClick';
import InfoMenu from './InfoMenu';

const InfoButton = () => {
  const infoButtonRef = useRef<HTMLDivElement>(null);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  useOutsideClick(infoButtonRef, () => {
    setIsMenuOpened(false);
  });

  return (
    <div ref={infoButtonRef}>
      <button
        className="fixed bottom-4 right-4 p-2 z-100 w-10 h-10 bg-primary-dark-700 text-white rounded-full hover:bg-primary-dark-800 focus:outline-none focus:ring-2 focus:bg-primary-dark-900 focus:bg-primary-dark-500-opacity-80"
        onClick={() => {
          setIsMenuOpened((prev: boolean) => {
            return !prev;
          });
        }}
        type="button"
      >
        ?
      </button>

      {isMenuOpened && (
        <div className="z-100">
          <InfoMenu />
        </div>
      )}
    </div>
  );
};

export default InfoButton;
