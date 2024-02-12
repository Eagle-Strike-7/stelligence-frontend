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
        variant="outline"
        size="sm"
        rounded="md"
        // color="text.dark"
        bg="primary.500"
        borderColor="primary.500"
        borderWidth={1}
        focusBorderColor="primary.400"
        fontSize="md"
        fontWeight={500}
        onChange={handleSelectedOption}
      >
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </Select>
    </div>
  );
};

export default ChakraSelect;
