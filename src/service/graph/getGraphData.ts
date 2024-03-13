import {
  transformResults,
  transformLinks,
} from '@/hooks/graph/transformGraphInfo';
import { Graph } from '@/types/graph/GraphProps';

const getGraphData = async (): Promise<Graph> => {
  const response = await fetch(`https://api.stelligence.site/api/documents`, { cache: 'no-cache' });
  const data = await response.json();

  const transformedResults = transformResults(data.results.documentNodes);
  const transformedLinks = transformLinks(data.results.links);

  return { nodes: transformedResults, links: transformedLinks };
};

export default getGraphData;
