import {
  transformResults,
  transformLinks,
} from '@/hooks/graph/transformGraphInfo';
import { Graph } from '@/types/graph/GraphProps';
import apiClient from '../login/axiosClient';

const getGraphData = async (): Promise<Graph> => {
  const response = await apiClient.get(`/api/documents`, {
    params: { depth: 3 },
  });
  const { data } = response;
  const transformedResults = transformResults(data.results.documentNodes);
  const transformedLinks = transformLinks(data.results.links);

  return { nodes: transformedResults, links: transformedLinks };
};

export default getGraphData;
