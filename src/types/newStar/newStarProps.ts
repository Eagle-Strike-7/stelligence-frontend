export interface Star {
  title: string;
  documentId: number;
  realtedDebate?: string;
  content: string;
}

export interface StarProps {
  star: Star;
  setStar: (newState: Star | ((prevState: Star) => Star)) => void;
}

export interface Document {
  documentId: number;
  title: string;
  group?: string;
}
