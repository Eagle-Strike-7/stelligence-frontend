import { SearchResult } from '@/types/graph/GraphProps';

const extractSearchIdOnly = (searchResults: SearchResult[]) => {
  const resultIds = searchResults.map((item: SearchResult) => {
    return item.documentId.toString();
  });

  return resultIds;
};

export default extractSearchIdOnly;
