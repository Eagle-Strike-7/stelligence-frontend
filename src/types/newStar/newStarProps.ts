export interface NewStar {
  title: string;
  tag: string;
  content: string;
}

export interface NewStarProps {
  newStar: {
    title: string;
    tag: string;
    content: string;
  };
  setNewStar: (newState: NewStar | ((prevState: NewStar) => NewStar)) => void;
}

export interface Document {
  documentId: string;
  title: string;
  group: string;
}

export interface ResponseType {
  success: boolean;
  message: string;
  results: Document[];
}
