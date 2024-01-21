import React from 'react';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import Wrapper from '@/components/Common/Wrapper';
import GalaxyGraph from './GalaxyGraph';

const Home = () => {
  const nodes = [{ id: 'root', group: '0' }];
  const links = [];

  const addChildNodes = (parentId, groupId, numChildren) => {
    for (let i = 0; i < numChildren && nodes.length < 100; i += 1) {
      const nodeId = `node${groupId}_${i}`;
      nodes.push({ id: nodeId, group: groupId }); // 그룹 ID를 groupId로 설정
      links.push({ source: parentId, target: nodeId });
    }
  };

  // 각 그룹의 루트 노드 추가 및 자식 노드 생성
  let groupId = 1;
  while (nodes.length < 100) {
    // 새로운 그룹의 루트 노드 생성
    const rootId = `root${groupId}`;
    nodes.push({ id: rootId, group: `${groupId}` });

    // 자식 노드 추가
    const numChildren = Math.min(
      100 - nodes.length,
      3 + Math.floor(Math.random() * 4),
    ); // 3에서 6개의 자식 노드 무작위 추가
    addChildNodes(rootId, groupId, numChildren);

    groupId += 1;
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
