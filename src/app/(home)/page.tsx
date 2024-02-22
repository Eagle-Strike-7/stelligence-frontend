'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Graph, SearchResult } from '@/types/graph/GraphProps';
import '../../styles/graph.module.css';
import getGraphData from '@/service/graph/getGraphData';
import extractSearchIdOnly from '@/hooks/graph/extractIdOnly';
import { usePathname } from 'next/navigation';
import useDebounce from '@/hooks/common/useDebounce';
import getSearchResult from '@/service/search/getSearchResult';
import { Box, Center } from '@chakra-ui/react';
import GalaxyGraph from './components/GalaxyGraph';
import SearchInput from './components/Search/SearchInput';
import SearchDropdown from './components/Search/SearchDropdown';
import LoadingComponent from './components/LoadingComponent';
import ErrorComponent from './components/ErrorComponent';

const Home = () => {
  const pathname = usePathname();
  const [searchText, setSearchText] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const debouncedQuery = useDebounce(searchText, 300);

  // NOTE 페이지 바뀔 때마다 input 초기화
  useEffect(() => {
    setSearchText('');
  }, [pathname]);

  const {
    data: searchResultsNew,
    refetch,
    isSuccess,
  } = useQuery<SearchResult[]>({
    queryKey: ['searchResults', debouncedQuery],
    queryFn: () => {
      return getSearchResult(debouncedQuery);
    },
    enabled: !!debouncedQuery && debouncedQuery.length > 0, // 조건부 쿼리 실행
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setSearchText(event.target.value);
    setIsDropdownOpen(event.target.value !== '');
  };

  const handleSelectItem = (event: any) => {
    setSearchText(event.target.id);
    setIsDropdownOpen(false);
  };

  const handleSearch = () => {
    if (searchText) refetch();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const { data, isError, isLoading } = useQuery<Graph>({
    queryKey: ['graphData'],
    queryFn: getGraphData,
  });

  // FIXME 임시 설정
  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorComponent />;

  return (
    <Center>
      <Box w="full" mx={{ base: '4', md: '10' }} mt="12">
        <div className="flex justify-center mt-8 relative w-full mb-6">
          <SearchInput
            searchText={searchText}
            isDropdownOpen={isDropdownOpen}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            handleSearch={handleSearch}
          />
          {searchText && isDropdownOpen && (
            <SearchDropdown
              searchResultsNew={searchResultsNew}
              setIsDropdownOpen={setIsDropdownOpen}
              handleSelectItem={handleSelectItem}
            />
          )}
        </div>

        <div className="flex justify-center mt-[-15rem] pt-2">
          {data && (
            <GalaxyGraph
              nodes={data.nodes}
              links={data.links}
              searchResults={extractSearchIdOnly(searchResultsNew) || []}
              isSearchSuccess={isSuccess}
            />
          )}
        </div>
      </Box>
    </Center>
  );
};

export default Home;
