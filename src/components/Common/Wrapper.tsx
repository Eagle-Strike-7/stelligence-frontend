import React from 'react';
import { Box, Center } from '@chakra-ui/react';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <Center>
            <Box w="70rem" className="m-20">
                <Center className="flex flex-col">{children}</Center>
            </Box>
        </Center>
    );
};

export default Wrapper;
