import React from 'react';
import { Button } from '@chakra-ui/react';

// NOTE : 생성하기/요청하기 버튼
const SubmitButton = ({ name }: { name: string }) => {
  return (
    <div className="flex justify-center">
      <Button
        mt="2.5rem"
        w="fit-content"
        size="lg"
        variant="solid"
        bgColor="primary.500"
        color="white"
        type="submit"
      >
        {name}
      </Button>
    </div>
  );
};

export default SubmitButton;
