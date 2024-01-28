import useOutsideClick from '@/hooks/common/useOutsideClick';
import searchTextState from '@/store/search/searchInput';
import { SearchResult } from '@/types/graph/GraphProps';
import { Box, VStack } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useSetRecoilState } from 'recoil';

interface SearchDropdownProps {
  searchResults: SearchResult[];
  setIsDropdownOpen: (isOpen: boolean) => void;
  handleSearch: (text: string) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  searchResults,
  setIsDropdownOpen,
  handleSearch,
}) => {
  const setSearchText = useSetRecoilState(searchTextState);

  // NOTE 포커스 아웃 처리를 위한 drodownRef를 생성
  const dropdownRef = useRef<HTMLDivElement>(null);

  // NOTE 포커스 아웃 처리 훅 호출 및 동작 지정
  useOutsideClick(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  const handleAutoComplete = (e: any) => {
    setSearchText(e.currentTarget.id);
    handleSearch(e.currentTarget.id);
    setIsDropdownOpen(false);
  };

  return (
    <VStack
      ref={dropdownRef}
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
      {searchResults.length > 0 ? (
        searchResults.map(result => {
          return (
            <Box
              onClick={handleAutoComplete}
              id={result.title}
              key={result.documentId}
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
        })
      ) : (
        <Box
          lineHeight="2.5rem"
          h="3rem"
          paddingX={2}
          paddingY={1}
          rounded="md"
          fontSize="lg"
        >
          검색 결과가 없습니다
        </Box>
      )}
    </VStack>
  );
};

export default SearchDropdown;
