export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  group: string;
  title: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}

export interface SearchResult {
  documentId: string;
  title: string;
  group: string;
}

export interface ServerLink {
  linkId: number;
  parentDocumentId: number;
  childDocumentId: number;
}

export interface Graph {
  nodes: GraphNode[];
  links: GraphLink[];
}
