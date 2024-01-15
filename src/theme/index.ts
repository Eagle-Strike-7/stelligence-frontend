import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
    breakpoints: {
        mobile: '0px',
        desktop: '992px',
    },
});

export default customTheme;
