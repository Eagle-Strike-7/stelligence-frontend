'use client';

import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';
import GalaxyGraph, { Link } from './components/GalaxyGraph';

interface SearchResult {
  documentId: string;
  title: string;
  groupt: string;
}

const Home = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const tempUrl = 'http://211.201.26.10:8080/api/documents/search';

  const handleSearch = () => {
    axios
      .get(`${tempUrl}?title=${searchText}`)
      .then(response => {
        const { data } = response;
        const resultIds = data.map((item: SearchResult) => {
          return item.documentId;
        });
        setSearchResults(resultIds);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  };

  const nodes = [{ id: 'root', group: '0', title: '시작' }];
  const links: Link[] = []; // Link 타입 객체들의 배열

  const addChildNodes = (
    parentId: string,
    groupId: string,
    numChildren: number,
  ) => {
    for (let i = 0; i < numChildren && nodes.length < 100; i += 1) {
      const nodeId = `node${groupId}_${i}`;
      nodes.push({ id: nodeId, group: groupId, title: nodeId }); // 그룹 ID를 groupId로 설정
      links.push({ source: parentId, target: nodeId });
    }
  };
  console.log(nodes);

  let groupId = 1;
  while (nodes.length < 100) {
    const rootId = `root${groupId}`;
    nodes.push({ id: rootId, group: `${groupId}`, title: `마리모` });

    const numChildren = Math.min(
      100 - nodes.length,
      3 + Math.floor(Math.random() * 4),
    );
    addChildNodes(rootId, `${groupId}`, numChildren);

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
              onClick={handleSearch}
            >
              <BiSearch fontSize="1.5rem" />
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>

      <div className="mt-5">
        <GalaxyGraph
          nodes={nodes}
          links={links}
          searchResults={searchResults}
        />
      </div>
    </div>
  );
};

export default Home;
