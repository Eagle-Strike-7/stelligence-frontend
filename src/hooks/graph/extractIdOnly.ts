import { SearchResult } from '@/types/graph/GraphProps';

const extractSearchIdOnly = (searchResults: SearchResult[] | undefined) => {
  if (searchResults) {
    const resultIds = searchResults.map((item: SearchResult) => {
      return item.documentId.toString();
    });
    return resultIds;
  }
  return [];
};

export default extractSearchIdOnly;
