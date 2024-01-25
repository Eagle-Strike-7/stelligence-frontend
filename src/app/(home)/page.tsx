'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import {
  transformResults,
  transformLinks,
} from '@/hooks/graph/transformGraphInfo';
import { Graph, SearchResult } from '@/types/graph/GraphProps';
import GalaxyGraph from './components/GalaxyGraph';
import '../../styles/graph.module.css';

const SERVER_URL =
  'http://ec2-43-203-87-227.ap-northeast-2.compute.amazonaws.com';

const getGraphData = async (): Promise<Graph> => {
  const response = await axios.get(`${SERVER_URL}/api/documents`, {
    params: { depth: 7 },
  });
  const { data } = response;

  const transformedResults = transformResults(data.results.documentNodes);
  const transformedLinks = transformLinks(data.results.links);

  return { nodes: transformedResults, links: transformedLinks };
};

const Home = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

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
        setSearchResults(resultIds);
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
    <div className="flex flex-col items-center bg-black pt-2">
      <div className="mt-8">
        <InputGroup width="full">
          <Input
            w="40rem"
            size="lg"
            color="white"
            placeholder="어떤 별을 찾으시나요?"
            focusBorderColor="#4e4d9c"
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
              _hover={{ bg: '#4e4d9c' }}
              marginTop="0.5rem"
              onClick={handleSearch}
            >
              <BiSearch fontSize="1.5rem" color="#d9d9d9" />
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>

      <div className="mt-5">
        {data && (
          <GalaxyGraph
            nodes={data.nodes}
            links={data.links}
            searchResults={searchResults}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
