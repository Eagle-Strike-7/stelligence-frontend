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
    },
});

export default customTheme;
