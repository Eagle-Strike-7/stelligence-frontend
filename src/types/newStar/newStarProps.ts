export interface Star {
  title: string;
  tag: string;
  realtedDebate?: string;
  content: string;
}

export interface StarProps {
  star: Star;
  setStar: (newState: Star | ((prevState: Star) => Star)) => void;
}

export interface Document {
  documentId: string;
  title: string;
  group: string;
}
