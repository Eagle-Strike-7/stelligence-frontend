import { Button } from '@chakra-ui/react';
import React from 'react';

interface ClickProps {
  name: string;
  setCreate?: (value: boolean) => void;
  setRevise: (value: string) => void;
}

// NOTE : 편집/삭제 버튼
const OutlineButton = ({ name, setCreate, setRevise }: ClickProps) => {
  const handleClick = () => {
    if (setCreate) {
      setCreate(false);
    }
    setRevise(name);
  };
  return (
    <Button
      size="md"
      colorScheme="gray"
      variant="outline"
      h="2rem"
      onClick={handleClick}
    >
      {name}
    </Button>
  );
};

export default OutlineButton;
