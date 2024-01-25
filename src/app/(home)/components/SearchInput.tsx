import React from 'react';
import { InputGroup, InputRightElement, Button, Input } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';

interface SearchInputProps {
  searchText: string;
  setSearchText: (text: string) => void;
  handleSearch: () => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchText,
  setSearchText,
  handleSearch,
  isDropdownOpen,
  setIsDropdownOpen,
}) => {
  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <InputGroup
      width="full"
      zIndex={1}
      onBlur={() => {
        return setIsDropdownOpen(false);
      }}
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
        onChange={handleSearchText}
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
  );
};

export default SearchInput;
