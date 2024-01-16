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
            light: '#ffffff',
        },
        accent: {
            light: '#242372',
        },
        header: {
            light: '#07063B',
        },
        text: {
            light: '000000',
            dark: 'ffffff',
        },
        gray: {
            50: '#F7FAFC',
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
    },
});

export default customTheme;
