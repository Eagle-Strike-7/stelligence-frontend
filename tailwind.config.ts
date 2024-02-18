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
          dark: ' #212121',
        },
        accent: {
          light: '#242372',
        },
        header: {
          light: '#07063B',
          dark: '#010101',
        },
        text: {
          light: '#000000',
          dark: '#ffffff',
        },
        naver: {
          light: '#03C75A',
        },
        kakao: {
          light: '#FEE500',
        },
        vote: {
          start: '#38A169',
          approve: '#FF0000',
          reject: '#4236D4',
        },
        section: {
          Bg: '#F2F4F6',
          addBg: 'rgba(237, 255, 236, 0.2)',
          deleteBg: 'rgba(255, 159, 159, 0.2)',
        },
        requestBtn: {
          Bg: '#EDF2F7',
        },
        input: {
          placeholder: '#A0AEC0',
        },
        primaryGray: {
          dark: '#667799', // 다희님색
        },
        primary: {
          dark: {
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
        },
        primaryLight: {
          dark: '#D0D8FB',
        },
        secondary: { dark: '#F9AF6C' },
        secondaryLight: { dark: '#FFD8B7' },
        tertiary: { dark: '#85D2E6' },
        gray: {
          50: '#F2F4F6',
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
    },
  },
  plugins: [],
};
export default config;
