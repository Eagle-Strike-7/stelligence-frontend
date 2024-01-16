import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                variable: ['Pretendard', 'inter', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            screens: {
                mobile: '0rem',
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
                    light: '#000000',
                    dark: '#ffffff',
                },
                naver: {
                    light: '#03C75A',
                },
                // TODO: light, dark에서 공통으로 쓸 색상으로 변경
                vote: {
                    start: '#38A169',
                    approve: '#FF0000',
                    reject: '#4236D4',
                },
                section: {
                    addBg: '#CDF4CA',
                    deleteBg: '#FF0000',
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
                gray: {
                    50: '#EDF2F7', // requestButton
                    100: '#FDFDFD', // sectionBg
                    200: '#E2E8F0', // containerBorder
                    400: '#A0AEC0', // placeholder
                }
            },
        },
    },
    plugins: [],
};
export default config;

