import React from 'react';
import { Box, Center } from '@chakra-ui/react';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Center>
      <Box w="70rem" className="mx-20 mb-40 mt-12">
        {children}
      </Box>
    </Center>
  );
};

export default Wrapper;
