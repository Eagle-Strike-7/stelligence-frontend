import { ThemeConfig, extendTheme } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const customTheme = extendTheme({
  config,
  breakpoints: {
    mobile: '0px',
    desktop: '62rem',
  },
  colors: {
    background: {
      50: '#ffffff',
    },
    accent: {
      500: '#242372',
    },
    header: {
      500: '#07063B',
    },
    text: {
      50: '000000',
      500: 'AEAEAE',
      900: 'ffffff',
    },
    primaryGray: {
      500: '#667799', // 다희님색
    },
    primary: {
      100: '#e4e9fa',
      200: '#c8d4f5',
      300: '#adbef1',
      400: '#91a9ec',
      500: '#7693e7',
      600: '#5e76b9',
      700: '#47588b',
      800: '#2f3b5c',
      900: '#181d2e',
    },
    primaryLight: {
      500: '#D0D8FB',
    },
    secondary: { 500: '#F9AF6C' },
    secondaryLight: { 500: '#FFD8B7' },
    gray: {
      50: '#f2f4f6',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    },
    blue: {
      50: '#EBF8FF',
      100: '#BEE3F8',
      200: '#90CDF4',
      300: '#63B3ED',
      400: '#4299E1',
      500: '#3182CE',
      600: '#2B6CB0',
      700: '#2C5282',
      800: '#2A4365',
      900: '#1A365D',
    },
    requestBtn: {
      500: '#EDF2F7',
    },
    sectionBackground: {
      500: '#F2F4F6',
    },
    sectionAddBackground: {
      500: 'rgba(237, 255, 236, 0.2)',
    },
    sectionDeleteBackground: {
      500: 'rgba(255, 159, 159, 0.2)',
    },
    placeholder: '#A0AEC0',
    kakao: {
      500: '#FEE500',
    },
    naver: {
      500: '#03C75A',
    },
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
});

export default customTheme;
