"use client"

import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import muiTheme from '@/theme/mui';
import customTheme from '../../theme/chakra';

const ClientThemeProviders = ({ children }: any) => {
  return (
    <MUIThemeProvider theme={muiTheme}>
      <ChakraProvider theme={customTheme}>
        {children}
      </ChakraProvider>
    </MUIThemeProvider>
  );
};

export default ClientThemeProviders;
