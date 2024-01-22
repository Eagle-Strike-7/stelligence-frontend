'use client';

import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import GalaxyGraph from './components/GalaxyGraph';

const Home = () => {
  const [searchText, setSearchText] = useState<string>('');

  const nodes = [{ id: 'root', group: '0' }];
  const links = [];

  const addChildNodes = (parentId, groupId, numChildren) => {
    for (let i = 0; i < numChildren && nodes.length < 100; i += 1) {
      const nodeId = `node${groupId}_${i}`;
      nodes.push({ id: nodeId, group: groupId, title: nodeId }); // 그룹 ID를 groupId로 설정
      links.push({ source: parentId, target: nodeId });
    }
  };

  // 각 그룹의 루트 노드 추가 및 자식 노드 생성
  let groupId = 1;
  while (nodes.length < 100) {
    // 새로운 그룹의 루트 노드 생성
    const rootId = `root${groupId}`;
    nodes.push({ id: rootId, group: `${groupId}`, title: `마리모` });

    // 자식 노드 추가
    const numChildren = Math.min(
      100 - nodes.length,
      3 + Math.floor(Math.random() * 4),
    ); // 3에서 6개의 자식 노드 무작위 추가
    addChildNodes(rootId, groupId, numChildren);

    groupId += 1;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <div className="mt-5">
        <InputGroup width="full">
          <Input
            w="40rem"
            size="lg"
            placeholder="어떤 별을 찾으시나요?"
            value={searchText}
            onChange={e => {
              return setSearchText(e.target.value);
            }}
          />
          <InputRightElement width="4rem">
            <Button
              h="2.5rem"
              size="sm"
              paddingX="1rem"
              variant="ghost"
              colorScheme="facebook"
              marginTop="0.5rem"
            >
              <BiSearch fontSize="1.5rem" />
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>

      <div className="mt-5">
        <GalaxyGraph nodes={nodes} links={links} />
      </div>
    </div>
  );
};

export default Home;
