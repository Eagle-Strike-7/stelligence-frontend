import React from 'react';
import { Button } from '@chakra-ui/react';

// NOTE : 생성하기/요청하기 버튼
const AccentButton = ({ name }: { name: string }) => {
  return (
    <div className="flex justify-center">
      <Button
        mt="2.5rem"
        w="fit-content"
        size="lg"
        variant="solid"
        colorScheme="blue"
        background="accent.500"
        type="submit"
      >
        {name}
      </Button>
    </div>
  );
};

export default AccentButton;
