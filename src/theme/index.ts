import { ThemeConfig, extendTheme } from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const customTheme = extendTheme({
    config,
    breakpoints: {
        mobile: '0px',
        desktop: '992px',
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
    },
});

export default customTheme;
