import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, VStack } from '@chakra-ui/react';

const InfoMenu = () => {
  const menuList = [
    { label: 'info', content: '🗺️ 은하수 여행가이드 확인' },
    { label: 'feedback', content: '🫶 피드백 제안' },
  ];
  const router = useRouter();
  const feedbackLink = 'https://forms.gle/DDek2gJVPAWHnjij8';
  const handleDropdownSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickedMenu = e.currentTarget.id;
    console.log(clickedMenu);

    switch (clickedMenu) {
      case 'info':
        router.push('/info');
        break;
      case 'feedback':
        window.open(feedbackLink, '_blank');
        break;
      default:
        console.log('No action for this menu item');
    }
  };
  return (
    <VStack
      position="fixed"
      right={2}
      bottom={16}
      bg="rgba(18,18,18,0.8)"
      padding={2}
      spacing={2}
      borderWidth={2}
      borderTopWidth={0}
      align="stretch"
      color="white"
      verticalAlign="middle"
      zIndex="dropdown"
      borderColor="#292929"
      rounded="lg"
    >
      {menuList.map(result => {
        return (
          <Box
            onClick={handleDropdownSelect}
            paddingX={2}
            paddingY={1}
            rounded="md"
            _hover={{ cursor: 'pointer', bg: '#292929' }}
            fontSize="md"
            id={result.label}
            key={result.label}
          >
            {result.content}
          </Box>
        );
      })}
    </VStack>
  );
};

export default InfoMenu;
