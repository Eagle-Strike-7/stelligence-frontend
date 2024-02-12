'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Graph, SearchResult } from '@/types/graph/GraphProps';
import '../../styles/graph.module.css';
import getGraphData from '@/service/graph/getGraphData';
import extractSearchIdOnly from '@/hooks/graph/extractIdOnly';
import { usePathname } from 'next/navigation';
import { getUserData } from '@/service/userService';
import { setLatestLogin } from '@/service/login/latestLogin';
import { setLoginStateLocalStorage } from '@/service/login/loginState';
import useDebounce from '@/hooks/common/useDebounce';
import GalaxyGraph from './components/GalaxyGraph';
import SearchInput from './components/Search/SearchInput';
import SearchDropdown from './components/Search/SearchDropdown';
import LoadingComponent from './components/LoadingComponent';
import ErrorComponent from './components/ErrorComponent';

const Home = () => {
  const [searchText, setSearchText] = useState<string>('');
  // NOTE 드롭다운에서 클릭한 요소 state
  const [selectedItem, setSelectedItem] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pathname = usePathname();

  // NOTE 페이지 바뀔 때마다 input 초기화
  useEffect(() => {
    setSearchText('');
  }, [pathname]);

  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    const handleInputChange = async (text: string) => {
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/documents/search`, {
          params: { title: text, depth: 3 },
        })
        .then(response => {
          setSearchResults(response.data.results);
        })
        .catch(error => {
          console.error('Error fetching search results: ', error);
        });
    };
    // NOTE 드롭다운에서 선택된 항목이 있으면 그 값을 사용하고, 그렇지 않으면 디바운스된 검색 텍스트를 사용
    const queryText = selectedItem || debouncedSearchText;
    handleInputChange(queryText);
  }, [debouncedSearchText, selectedItem]);

  const handleChangedSearchInput = (e: any) => {
    e.stopPropagation();
    const { value } = e.target;
    setSearchText(value);
    // NOTE 검색 텍스트가 있을 때만 드롭다운을 열도록 설정
    setIsDropdownOpen(value !== '');
  };

  const handleDropdownSelect = (e: any) => {
    e.stopPropagation();
    const selectedValue = e.target.id;
    setSearchText(selectedValue);
    setSelectedItem(selectedValue);
    setIsDropdownOpen(false);
  };

  const { data, isError, isLoading } = useQuery<Graph>({
    queryKey: ['graphData'],
    queryFn: getGraphData,
  });

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: getUserData,
  });

  useEffect(() => {
    // NOTE 마지막 로그인 수단: 로그인 소셜 로컬스토리지에 저장
    setLatestLogin(userData?.results.socialType);
    // NOTE 로그인 상태 새로고침 해도 유지되게 로컬스토리지에 저장
    setLoginStateLocalStorage(!!userData?.success);
  }, [userData]);

  // FIXME 임시 설정
  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorComponent />;

  return (
    <div className="flex flex-col items-center h-screen pt-2">
      <div className="mt-8 relative">
        <SearchInput
          searchText={searchText}
          setSearchText={setSearchText}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          handleChangedSearchInput={handleChangedSearchInput}
        />
        {searchText && isDropdownOpen && (
          <SearchDropdown
            searchResults={searchResults}
            setIsDropdownOpen={setIsDropdownOpen}
            handleDropdownSelect={handleDropdownSelect}
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
