export interface StarSection {
  sectionId: number;
  revision: number;
  heading: ['H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6'];
  title: string;
  content: string;
}

export interface StarContributor {
  memberId: number;
  nickname: string;
  profileImgUrl?: string;
}

export interface Star {
  documentId: number;
  title: string;
  lastModifiedAt: string;
  sections: StarSection[];
  content: string;
  originalAuthor: StarContributor;
  contributors: StarContributor[];
  editable: boolean;
}
