import React from 'react';
import { Box, Center } from '@chakra-ui/react';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <Center>
            <Box w="80em">
                <Center>{children}</Center>
            </Box>
        </Center>
    );
};

export default Wrapper;
