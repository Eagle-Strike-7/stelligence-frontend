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
                <InputGroup
                    width="26.5rem"
                    height="3rem"
                    className="flex justify-center place-items-center"
                >
                    <Input
                        variant="outline"
                        pr="4rem"
                        size="lg"
                        placeholder="어떤 별을 찾으시나요?"
                        className="rounded-md"
                    />
                    <InputRightElement
                        width="4rem"
                        height="3rem"
                        className="flex my-auto mr-1"
                    >
                        <Button
                            w="full"
                            size="md"
                            variant="ghost"
                            colorScheme="facebook"
                            className="mr-1 h-10 w-10"
                        >
                            <BiSearch className="w-6 h-6" />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Center>
        </Wrapper>
    );
};

export default Home;
