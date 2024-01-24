'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import {
  transformResults,
  transformLinks,
} from '@/hooks/graph/transformGraphInfo';
import { GraphNode, GraphLink, SearchResult } from '@/types/graph/GraphProps';
import GalaxyGraph from './components/GalaxyGraph';
import '../../styles/graph.module.css';

const Home = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [initialNodes, setInitialNodes] = useState<GraphNode[]>([]);
  const [initialLinks, setInitialLinks] = useState<GraphLink[]>([]);

  const SERVER_URL =
    'http://ec2-43-203-87-227.ap-northeast-2.compute.amazonaws.com';

  const handleSearch = () => {
    axios
      .get(`${SERVER_URL}/api/documents/search`, {
        params: { title: searchText },
      })
      .then(response => {
        const { data } = response;
        const resultIds = data.results.map((item: SearchResult) => {
          return item.documentId.toString();
        });
        setSearchResults(resultIds);
      })
      .catch(error => {
        throw new Error('Error fetching data: ', error);
      });
  };

  const fetchGraphData = () =>
    {return axios
      .get(`${SERVER_URL}/api/documents`, { params: { depth: 7 } })
      .then(response => {
        const { data } = response;

        const transfomedResults = transformResults(data.results.documentNodes);
        const transformedLinks = transformLinks(data.results.links);

        setInitialNodes(transfomedResults);
        setInitialLinks(transformedLinks);
      })
      .catch(error => {
        throw new Error('Error fetching data: ', error);
      })};

  useEffect(() => {
    fetchGraphData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="mt-8">
        <InputGroup width="full">
          <Input
            w="40rem"
            size="lg"
            color="white"
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
          nodes={initialNodes}
          links={initialLinks}
          searchResults={searchResults}
        />
      </div>
    </div>
  );
};

export default Home;
