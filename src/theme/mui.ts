import { createTheme } from '@mui/material/styles';

// MUI 테마 설정
const muiTheme = createTheme({
  palette: {
    // 기본적인 색상 구성 예시
    primary: {
      main: '#7693E7', // primary 색상
      light: '#D0D8FB', // primaryLight 색상
    },
    secondary: {
      main: '#F9AF6C', // secondary 색상
      light: '#FFD8B7', // secondaryLight 색상
    },
    error: {
      main: '#f44336', // 에러 색상 추가 (예시)
    },
    // 커스텀 색상 추가 방법
    background: {
      default: '#ffffff', // 페이지 기본 배경 색상
      paper: '#f2f4f6', // 카드 및 컴포넌트 배경 색상
    },
    text: {
      primary: '#000000', // 주 텍스트 색상
      secondary: '#AEAEAE', // 보조 텍스트 색상
      disabled: '#718096', // 비활성 텍스트 색상
    },
    // 추가적인 커스텀 색상 정의
    // 여기에 다른 커스텀 색상을 palette에 맞게 추가할 수 있습니다.
    // 예: customColor: { main: '#...', contrastText: '#...' }
  },
});

export default muiTheme;
