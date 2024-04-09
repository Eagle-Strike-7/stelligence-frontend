import { ServerNode } from '@/types/graph/GraphProps';

const extractSearchIdOnly = (searchResults: ServerNode[] | undefined) => {
  if (searchResults) {
    const resultIds = searchResults.map((item: ServerNode) => {
      return item.documentId.toString();
    });
    return resultIds;
  }
  return [];
};

export default extractSearchIdOnly;
