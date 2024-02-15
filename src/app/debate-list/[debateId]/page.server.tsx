import { Contribute } from '@/types/common/Amendment';
import apiClient from '@/service/login/axiosClient';

export interface Debate {
  debateId: number;
  createdAt: string;
  endAt: string;
  status: 'OPEN' | 'CLOSED';
  contribute: Contribute;
}
export interface DebateDetailApiResponse {
  success: boolean;
  message: string;
  results: Debate;
}

export async function getDebateData(debateId: number): Promise<Debate> {
  try {
    const response = await apiClient.get<DebateDetailApiResponse>(
      `/api/debates/${debateId}`,
    );
    if (!response.data.success) {
      console.log('Data fetching failed');
      throw Error('토론 데이터 패칭에 실패했습니다');
    }
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw Error('토론 데이터 패칭에 실패했습니다');
  }
}
