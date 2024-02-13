import { createTheme } from '@mui/material/styles';

// MUI 테마 설정
const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#7693E7',
      light: '#D0D8FB',
    },
    secondary: {
      main: '#F9AF6C',
      light: '#FFD8B7',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#212121',
    },
    text: {
      primary: '#fff', // 주 텍스트 색상
      secondary: '#000', // 보조 텍스트 색상
      disabled: '#718096', // 비활성 텍스트 색상
    },
  },
});

export default muiTheme;
