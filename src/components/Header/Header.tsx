import React, { useRef } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { IoMenu } from 'react-icons/io5';
import Navigation from './LeftNav';
import Login from './RightNav';
import Logo from './Logo';
import NewStarButton from './NewStarButton';
import VoteButton from './VoteButton';
import DebateButton from './DebateButton';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="flex w-full h-16 bg-[#212121] border-b border-gray-500/20 text-white justify-center sticky top-0 z-10 ">
      <div className="flex flex-row h-16 w-[80rem] justify-between items-center">
        <div className="mobile:flex desktop:hidden mobile:ml-4">
          <Button
            ref={btnRef}
            onClick={onOpen}
            bgColor="transparent"
            color="white"
            fontSize="2xl"
            _hover={{
              bgColor: 'transparent',
              color: 'white',
            }}
          >
            <IoMenu />
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader className="bg-[#212121] text-white">
                메뉴
                <DrawerCloseButton />
              </DrawerHeader>
              <DrawerBody className="flex flex-col bg-[#212121]">
                <VoteButton />
                <DebateButton />
                <NewStarButton />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="mobile:hidden desktop:flex">
          <Navigation />
        </div>
        <Logo />
        <div className="flex flex-row items-center">
          <div className="mobile: hidden desktop:flex">
            <NewStarButton />
          </div>
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Header;
