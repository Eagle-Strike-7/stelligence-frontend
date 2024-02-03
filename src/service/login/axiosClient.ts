import axios from 'axios';
import { useRouter } from 'next/router';

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // SECTION UnAuthorized: 로그인하지 않은 사용자가 접속했을 때
    if (error.response.status === 401) {
      useRouter().push('/login');
    }

    return Promise.reject(error);
  },
);

export default apiClient;
