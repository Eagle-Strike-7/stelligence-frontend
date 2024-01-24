import {
  SearchResult,
  GraphNode,
  ServerLink,
  GraphLink,
} from '@/types/graph/GraphProps';

export const transformResults = (results: SearchResult[]): GraphNode[] => {
  return results.map(result => {return {
    id: result.documentId.toString(),
    title: result.title,
    group: result.group,
  }});
};

export const transformLinks = (serverLinks: ServerLink[]): GraphLink[] => {
  return serverLinks.map(link => {return {
    source: link.parentDocumentId.toString(),
    target: link.childDocumentId.toString(),
  }});
};
