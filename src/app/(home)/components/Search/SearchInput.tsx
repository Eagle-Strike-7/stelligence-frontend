import React from 'react';
import { InputGroup, InputRightElement, Button, Input } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';

interface SearchInputProps {
  searchText: string;
  setSearchText: (text: string) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
  handleChangedSearchInput: (e: any) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchText,
  setSearchText,
  isDropdownOpen,
  setIsDropdownOpen,
  handleChangedSearchInput,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const { value } = e.target as HTMLInputElement;
      setSearchText(value);
      setIsDropdownOpen(false);
    }
  };

  return (
    <InputGroup width="full" zIndex={1}>
      <Input
        w="40rem"
        size="lg"
        color="white"
        placeholder="어떤 별을 찾으시나요?"
        focusBorderColor="#121212"
        value={searchText}
        onChange={handleChangedSearchInput}
        variant="outline"
        borderColor="#292929"
        bg="#292929"
        _focus={{ borderColor: 'transparent', borderWidth: 2 }}
        _hover={{ borderColor: 'transparent', borderWidth: 2 }}
        borderBottomLeftRadius={isDropdownOpen ? 'none' : 'md'}
        borderBottomRightRadius={isDropdownOpen ? 'none' : 'md'}
        onKeyDown={handleKeyDown}
      />
      <InputRightElement width="4rem">
        <Button
          h="2.5rem"
          size="sm"
          paddingX="1rem"
          variant="ghost"
          _hover={{ bg: '#414141' }}
          marginTop="0.5rem"
          onClick={handleChangedSearchInput}
        >
          <BiSearch fontSize="1.5rem" color="#d9d9d9" />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
