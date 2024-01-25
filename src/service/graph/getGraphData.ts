import SERVER_URL from '@/constants/url';
import {
  transformResults,
  transformLinks,
} from '@/hooks/graph/transformGraphInfo';
import { Graph } from '@/types/graph/GraphProps';
import axios from 'axios';

const getGraphData = async (): Promise<Graph> => {
  const response = await axios.get(`${SERVER_URL}/api/documents`, {
    params: { depth: 3 },
  });
  const { data } = response;
  const transformedResults = transformResults(data.results.documentNodes);
  const transformedLinks = transformLinks(data.results.links);

  return { nodes: transformedResults, links: transformedLinks };
};

export default getGraphData;
