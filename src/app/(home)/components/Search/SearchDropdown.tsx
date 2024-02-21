import useOutsideClick from '@/hooks/common/useOutsideClick';
import { SearchResult } from '@/types/graph/GraphProps';
import { Box, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

interface SearchDropdownProps {
  searchResultsNew: SearchResult[] | undefined;
  setIsDropdownOpen: (isOpen: boolean) => void;
  handleSelectItem: (event: any) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  searchResultsNew,
  setIsDropdownOpen,
  handleSelectItem,
}) => {
  // NOTE 포커스 아웃 처리를 위한 drodownRef를 생성
  const dropdownRef = useRef<HTMLDivElement>(null);

  // NOTE 포커스 아웃 처리 훅 호출 및 동작 지정
  useOutsideClick(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  useEffect(() => {}, [searchResultsNew]);

  return (
    <VStack
      ref={dropdownRef}
      bg="rgba(18,18,18,0.8)"
      mt={12}
      paddingX={2}
      paddingY={2}
      spacing={2}
      borderWidth={2}
      borderTopWidth={0}
      align="stretch"
      position="absolute"
      color="white"
      w={{ base: '15rem', sm: '25rem', md: '45rem' }}
      verticalAlign="middle"
      borderBottomLeftRadius="md"
      borderBottomRightRadius="md"
      zIndex="dropdown"
      borderColor="#292929"
    >
      {searchResultsNew && searchResultsNew.length > 0 ? (
        searchResultsNew.map(result => {
          return (
            <Box
              onClick={handleSelectItem}
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
