export interface NewStar {
  title: string;
  parentDocumentId: number | null;
  content: string;
}

export interface Document {
  documentId: number;
  title: string;
  group?: string;
}
