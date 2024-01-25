'use client';

import React, { useState } from 'react';
import axios from 'axios';
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  VStack,
} from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import {
  transformResults,
  transformLinks,
} from '@/hooks/graph/transformGraphInfo';
import { Graph, GraphNode, SearchResult } from '@/types/graph/GraphProps';
import GalaxyGraph from './components/GalaxyGraph';
import '../../styles/graph.module.css';

const SERVER_URL =
  'http://ec2-43-203-87-227.ap-northeast-2.compute.amazonaws.com';

const getGraphData = async (): Promise<Graph> => {
  const response = await axios.get(`${SERVER_URL}/api/documents`, {
    params: { depth: 3 },
  });
  const { data } = response;
  const transformedResults = transformResults(data.results.documentNodes);
  const transformedLinks = transformLinks(data.results.links);

  return { nodes: transformedResults, links: transformedLinks };
};

const Home = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<GraphNode[]>([]);
  const [serachIds, setSearchIds] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data, isError, isLoading } = useQuery<Graph>({
    queryKey: ['graphData'],
    queryFn: getGraphData,
  });

  const handleSearch = () => {
    axios
      .get(`${SERVER_URL}/api/documents/search`, {
        params: { title: searchText },
      })
      .then(response => {
        const resultIds = response.data.results.map((item: SearchResult) => {
          return item.documentId.toString();
        });
        setSearchIds(resultIds);
        setSearchResults(response.data.results);

        if (response.data.results.length > 0) {
          setIsDropdownOpen(true);
        }
      })
      .catch(error => {
        console.error('Error fetching search results: ', error);
      });
  };

  if (isLoading)
    return (
      // FIXME 임시 설정
      <div className="h-screen bg-black text-white text-center pt-10">
        그래프 로딩중
      </div>
    );
  if (isError) return <div>Error loading data</div>;

  return (
    <div className="flex flex-col items-center bg-background-dark h-screen pt-2">
      <div className="mt-8 relative">
        <InputGroup
          width="full"
          zIndex={1}
          onBlur={() => {return setIsDropdownOpen(false)}}
        >
          <Input
            w="40rem"
            size="lg"
            color="white"
            placeholder="어떤 별을 찾으시나요?"
            focusBorderColor="#121212"
            value={searchText}
            variant="outline"
            borderColor="#292929"
            bg="#292929"
            _focus={{ borderColor: 'transparent', borderWidth: 2 }}
            _hover={{ borderColor: 'transparent', borderWidth: 2 }}
            borderBottomLeftRadius={isDropdownOpen ? 'none' : 'md'}
            borderBottomRightRadius={isDropdownOpen ? 'none' : 'md'}
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
              _hover={{ bg: '#414141' }}
              marginTop="0.5rem"
              onClick={handleSearch}
            >
              <BiSearch fontSize="1.5rem" color="#d9d9d9" />
            </Button>
          </InputRightElement>
        </InputGroup>

        {isDropdownOpen && (
          <VStack
            bg="rgba(18,18,18,0.8)"
            paddingX={2}
            paddingY={2}
            spacing={2}
            borderWidth={2}
            borderTopWidth={0}
            align="stretch"
            position="absolute"
            color="white"
            w="40rem"
            verticalAlign="middle"
            borderBottomLeftRadius="md"
            borderBottomRightRadius="md"
            zIndex="dropdown"
            borderColor="#292929"
          >
            {searchResults.map(result => {
              return (
                <Box
                  key={result.id}
                  lineHeight="2.5rem"
                  h="3rem"
                  paddingX={2}
                  paddingY={1}
                  rounded="md"
                  _hover={{ cursor: 'pointer', bg: '#292929' }}
                  fontSize="lg"
                >
                  {result.title}
                </Box>
              );
            })}
          </VStack>
        )}
      </div>

      <div className="mt-5">
        {data && (
          <GalaxyGraph
            nodes={data.nodes}
            links={data.links}
            searchResults={serachIds}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
