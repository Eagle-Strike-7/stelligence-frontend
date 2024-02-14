import { ResponseType } from '@/types/common/ResponseType';
import apiClient from './axiosClient';

const postLogout = async (): Promise<ResponseType<{}>> => {
  try {
    const response = await apiClient.post('/api/logout');
    return response.data;
  } catch (error) {
    console.error('로그아웃 실패: ', error);
    throw error;
  }
};

export default postLogout;
