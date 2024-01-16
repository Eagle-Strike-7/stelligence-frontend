import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

const StateTab = () => {
    return (
        <Flex>
            <Heading
                fontSize="1.25rem"
                fontWeight={500}
                className="mr-4 hover:cursor-pointer"
            >
                진행중
            </Heading>
            <Heading
                fontSize="1.25rem"
                fontWeight={500}
                className="hover:cursor-pointer"
            >
                완료
            </Heading>
        </Flex>
    );
};

export default StateTab;
