import { SearchResult } from '@/types/graph/GraphProps';
import apiClient from '../login/axiosClient';

const getSearchResult = async (input: string): Promise<SearchResult[]> => {
  if (!input.trim()) return [];
  try {
    const response = await apiClient.get<{ results: SearchResult[] }>(
      `/api/documents/search`,
      {
        params: { title: input },
      },
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching search results: ', error);
    throw new Error('Failed to fetch search results');
  }
};

export default getSearchResult;
