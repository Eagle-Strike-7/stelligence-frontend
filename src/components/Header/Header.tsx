import React from 'react';
import { Box } from '@chakra-ui/react';
import Navigation from './LeftNav';
import Login from './RightNav';
import Logo from './Logo';

const Header = () => {
  return (
    <div className="flex w-full h-16 bg-[#212121] border-b border-gray-500/20 text-white justify-center sticky top-0 z-10">
      <Box
        display="flex"
        width="80rem"
        justifyItems="space-between"
        className="flex-row h-16 justify-between items-center"
      >
        <Navigation />
        <Logo />
        <Login />
      </Box>
    </div>
  );
};

export default Header;
