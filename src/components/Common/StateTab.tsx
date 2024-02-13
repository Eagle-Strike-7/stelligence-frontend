'use client';

import { Button } from '@chakra-ui/react';

const StateTab: React.FC<{
  tab1: string;
  tab2: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}> = ({ tab1, tab2, activeTab, setActiveTab }) => {
  const handleKeyDown = (e: React.KeyboardEvent, tab: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tab);
    }
  };

  return (
    <div className="flex my-6">
      <Button
        variant="ghost"
        fontSize="lg"
        fontWeight="semibold"
        color="text.dark"
        opacity={activeTab === tab1 ? '1' : '0.2'}
        mr={4}
        _hover={{ cursor: 'pointer', bg: 'none' }}
        padding={0}
        onClick={() => {
          return setActiveTab(tab1);
        }}
        onKeyDown={e => {
          return handleKeyDown(e, tab1);
        }}
        role="button"
        tabIndex={0}
      >
        {tab1}
      </Button>

      <Button
        variant="ghost"
        fontSize="lg"
        fontWeight="semibold"
        color="text.dark"
        opacity={activeTab === tab2 ? '1' : '0.2'}
        mr={4}
        _hover={{ cursor: 'pointer', bg: 'none' }}
        padding={0}
        onClick={() => {
          return setActiveTab(tab2);
        }}
        onKeyDown={e => {
          return handleKeyDown(e, tab2);
        }}
        role="button"
        tabIndex={0}
      >
        {tab2}
      </Button>
    </div>
  );
};

export default StateTab;
