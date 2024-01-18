import React from 'react';
import { Box } from '@chakra-ui/react';
import Navigation from './Navigation';
import Login from './Login';
import Logo from './Logo';

const Header = () => {
  return (
    <div className="flex w-full h-16 bg-black text-white justify-center">
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
