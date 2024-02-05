import { Select } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';

interface Option {
  value: string;
  label: string;
}

interface ChakraSelectProps {
  options: Option[];
  setSelectedOption: (selected: string) => void;
}

const ChakraSelect: React.FC<ChakraSelectProps> = ({
  options,
  setSelectedOption,
}) => {
  const handleSelectedOption = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };
  return (
    <div className="flex my-0">
      <Select
        variant="filled"
        size="sm"
        rounded="md"
        borderColor="gray.200"
        borderWidth={1}
        focusBorderColor="gray.400"
        bg="white"
        onChange={handleSelectedOption}
      >
        {options.map(option => {return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        )})}
      </Select>
    </div>
  );
};

export default ChakraSelect;
