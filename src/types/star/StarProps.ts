import { Heading } from '../common/ResponseType';

export interface StarSection {
  sectionId: number;
  revision: number;
  heading: Heading;
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
