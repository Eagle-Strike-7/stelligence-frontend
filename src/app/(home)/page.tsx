import React from 'react';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import Wrapper from '@/components/Common/Wrapper';
import GalaxyGraph from './GalaxyGraph';

const Home = () => {
    const nodes = Array.from({ length: 50 }, (_, i) => {
        return {
            id: `${i + 1}`,
            group: (Math.floor(i / 10) + 1).toString(),
        };
    });

    const links = [];
    for (let i = 1; i < nodes.length; i += 1) {
        links.push({ source: '1', target: `${i + 1}` }); // 중앙 노드와 다른 노드들을 연결
    }

    // 추가적인 연결을 생성하여 원 형태에 가깝게 구성
    for (let i = 1; i < nodes.length - 1; i += 1) {
        if (i % 10 === 0) {
            links.push({ source: `${i}`, target: `${i + 2}` });
        } else {
            links.push({ source: `${i}`, target: `${i + 1}` });
        }
    }

    return (
        <Wrapper>
            <div className="flex flex-col justify-center place-items-center">
                <div className="flex flex-col w-100">
                    <InputGroup>
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
                </div>

                <div className="flex ">
                    <GalaxyGraph nodes={nodes} links={links} />
                </div>
            </div>
        </Wrapper>
    );
};

export default Home;
