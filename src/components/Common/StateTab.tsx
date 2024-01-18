import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

const StateTab: React.FC<{ tab1: string; tab2: string }> = ({ tab1, tab2 }) => {
    return (
        <Flex className="my-6">
            <Heading
                size="md"
                fontWeight={600}
                className="mr-4 hover:cursor-pointer"
            >
                {tab1}
            </Heading>
            <Heading
                size="md"
                fontWeight={600}
                className="hover:cursor-pointer"
            >
                {tab2}
            </Heading>
        </Flex>
    );
};

export default StateTab;
