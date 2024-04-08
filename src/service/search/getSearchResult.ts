import { ServerNode } from '@/types/graph/GraphProps';
import apiClient from '../login/axiosClient';

const getSearchResult = async (input: string): Promise<ServerNode[]> => {
  if (!input.trim()) return [];
  try {
    const response = await apiClient.get<{ results: ServerNode[] }>(
      `/api/documents/search`,
      {
        params: { title: input },
      },
    );
    return response.data.results;
  } catch (error) {
    throw new Error('검색 실패');
  }
};

export default getSearchResult;
