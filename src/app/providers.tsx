'use client';

import { ChakraProvider } from '@chakra-ui/react';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return <ChakraProvider>{children}</ChakraProvider>;
};

export default Providers;
