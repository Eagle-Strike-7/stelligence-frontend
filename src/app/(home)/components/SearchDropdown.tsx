import { SearchResult } from '@/types/graph/GraphProps';
import { Box, VStack } from '@chakra-ui/react';

import React from 'react';

interface SearchDropdownProps {
  searchResults: SearchResult[];
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ searchResults }) => {
  return (
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
      })}
    </VStack>
  );
};

export default SearchDropdown;
