import React from 'react';
import { Button } from '@chakra-ui/react';

// NOTE : 생성하기/요청하기 버튼
const SubmitButton = ({ name }: { name: string }) => {

  return (
    <div className="flex justify-center">
      <Button
        mt="2.5rem"
        w="fit-content"
        size="md"
        variant="outline"
        borderColor="transparent"
        bgColor="primary.500"
        color="#212121"
        type="submit"
        _hover={{
          bgColor: '#393939',
          color: 'primary.500',
          opacity: 0.8,
        }}
      >
        {name}
      </Button>
    </div>
  );
};

export default SubmitButton;
