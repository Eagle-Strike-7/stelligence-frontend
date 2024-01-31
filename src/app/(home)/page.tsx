'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Graph, SearchResult } from '@/types/graph/GraphProps';
import '../../styles/graph.module.css';
import getGraphData from '@/service/graph/getGraphData';
import extractSearchIdOnly from '@/hooks/graph/extractIdOnly';
import { useSetRecoilState } from 'recoil';
import searchTextState from '@/store/search/searchInput';
import { usePathname } from 'next/navigation';
import GalaxyGraph from './components/GalaxyGraph';
import SearchInput from './components/SearchInput';
import SearchDropdown from './components/SearchDropdown';
import LoadingComponent from './components/LoadingComponent';
import ErrorComponent from './components/ErrorComponent';

const Home = () => {
  const setSearchText = useSetRecoilState(searchTextState);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pathname = usePathname();

  // NOTE 페이지 바뀔 때마다 input 초기화
  useEffect(() => {
    setSearchText('');
  }, [pathname]);

  const { data, isError, isLoading } = useQuery<Graph>({
    queryKey: ['graphData'],
    queryFn: getGraphData,
  });

  // FIXME 임시 설정
  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorComponent />;

  const handleSearch = async (text: string) => {
    axios
      .get(`${process.env.SERVER_URL}/api/documents/search`, {
        params: { title: text, depth: 3 },
      })
      .then(response => {
        setSearchResults(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching search results: ', error);
      });
  };

  return (
    <div className="flex flex-col items-center bg-background-dark h-screen pt-2">
      <div className="mt-8 relative">
        <SearchInput
          handleSearch={handleSearch}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        />
        {isDropdownOpen && (
          <SearchDropdown
            handleSearch={handleSearch}
            searchResults={searchResults}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        )}
      </div>

      <div className="mt-5">
        {data && (
          <GalaxyGraph
            nodes={data.nodes}
            links={data.links}
            searchResults={extractSearchIdOnly(searchResults)}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
