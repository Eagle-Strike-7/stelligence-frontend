'use client';

import { Button } from '@chakra-ui/react';
import { useState } from 'react';

const StateTab: React.FC<{
  tab1: string;
  tab2: string;
}> = ({ tab1, tab2 }) => {
  const [active, setActive] = useState<string>(tab1);

  const handleKeyDown = (e: React.KeyboardEvent, tab: string) => {
    // 'Enter' 또는 'Space' 키가 눌렸는지 확인
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActive(tab);
    }
  };

  return (
    <div className="flex my-6">
      <Button
        variant="ghost"
        className={
          active === tab1
            ? 'text-lg font-semibold mr-4 hover:cursor-pointer p-0'
            : 'text-lg text-gray-300 font-semibold mr-4 hover:cursor-pointer p-0'
        }
        _hover={{ bg: 'none' }}
        onClick={() => {return setActive(tab1)}}
        onKeyDown={e => {return handleKeyDown(e, tab1)}}
        role="button"
        tabIndex={0}
        size="sm"
      >
        {tab1}
      </Button>

      <Button
        variant="ghost"
        className={
          active === tab2
            ? 'text-lg font-semibold mr-4 hover:cursor-pointer p-0'
            : 'text-lg text-gray-300 font-semibold mr-4 hover:cursor-pointer p-0'
        }
        _hover={{ bg: 'none' }}
        onClick={() => {return setActive(tab2)}}
        onKeyDown={e => {return handleKeyDown(e, tab2)}}
        role="button"
        tabIndex={0}
        size="sm"
      >
        {tab2}
      </Button>
    </div>
  );
};

export default StateTab;
