import { StateTabProps } from '@/types/common/StateTabProps';
import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

const StateTab: React.FC<StateTabProps> = ({ tab1, tab2 }) => {
    return (
        <Flex className="my-4">
            <Heading
                fontSize="1.25rem"
                fontWeight={500}
                className="mr-4 hover:cursor-pointer"
            >
                {tab1}
            </Heading>
            <Heading
                fontSize="1.25rem"
                fontWeight={500}
                className="hover:cursor-pointer"
            >
                {tab2}
            </Heading>
        </Flex>
    );
};

export default StateTab;
