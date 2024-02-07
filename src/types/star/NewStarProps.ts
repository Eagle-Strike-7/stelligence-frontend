export interface NewStar {
  title: string;
  documentId: number;
  realtedDebate?: string;
  content: string;
}

export interface NewStarProps {
  star: NewStar;
  setStar: (newState: NewStar | ((prevState: NewStar) => NewStar)) => void;
}

export interface Document {
  documentId: number;
  title: string;
  group?: string;
}
