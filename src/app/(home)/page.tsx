import Wrapper from '@/components/Common/Wrapper';
import {
    Button,
    Center,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';

const Home = () => {
    return (
        <Wrapper>
            <Center>
                <InputGroup mt="2rem">
                    <Input
                        w="26.5rem"
                        h="3rem"
                        p="1rem"
                        pr="3.5rem"
                        fontSize="1rem"
                        placeholder="어떤 별을 찾으시나요?"
                        fill="gray"
                        className="bg-gray-100 rounded-md"
                    />
                    <InputRightElement>
                        <Button h="3rem" size="lg" pr="1rem">
                            <BiSearch size="1.5rem" className="h-full" />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Center>
        </Wrapper>
    );
};

export default Home;
