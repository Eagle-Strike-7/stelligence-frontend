import React from 'react';
import { Box, Center } from '@chakra-ui/react';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Center>
      <Box w="70rem" mx={{ base: '4', md: '20' }} my="12" mb="40">
        {children}
      </Box>
    </Center>
  );
};

export default Wrapper;
