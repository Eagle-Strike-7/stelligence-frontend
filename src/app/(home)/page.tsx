import React from 'react';
import {
    Center,
    Input,
    InputGroup,
    InputRightElement,
    Button,
} from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import Wrapper from '@/components/Common/Wrapper';

const Home = () => {
    return (
        <Wrapper>
            <Center>
                <InputGroup width="26.5rem" height="3rem">
                    <Input
                        variant="outline"
                        paddingRight="4.5rem"
                        size="lg"
                        placeholder="어떤 별을 찾으시나요?"
                        borderRadius="md"
                    />
                    <InputRightElement width="4rem" height="3rem">
                        <Button
                            width="full"
                            size="md"
                            variant="ghost"
                            colorScheme="facebook"
                            height="10"
                            minWidth="10"
                            marginRight="1"
                        >
                            <BiSearch size="24px" />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Center>
        </Wrapper>
    );
};

export default Home;
