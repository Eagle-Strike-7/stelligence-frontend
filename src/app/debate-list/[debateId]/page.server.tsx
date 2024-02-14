import axios from 'axios';
import { Contribute } from '@/types/common/Amendment';

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

export async function getDebateData(debateId: number): Promise<Debate | null> {
  try {
    const response = await axios.get<DebateDetailApiResponse>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/debates/${debateId}`,
    );
    if (!response.data.success) {
      console.log('Data fetching failed');
      return null;
    }
    return response.data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
}
