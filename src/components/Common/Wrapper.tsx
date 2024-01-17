import React from 'react';
import { Box, Center } from '@chakra-ui/react';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <Center>
            <Box w="70rem" className="mx-20 my-10">
                {children}
            </Box>
        </Center>
    );
};

export default Wrapper;
