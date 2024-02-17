import { Heading } from '../common/ResponseType';

export interface StarSection {
  sectionId: number;
  revision: number;
  heading: Heading;
  title: string;
  content: string;
  creatingOrder: number;
}

export interface StarContributor {
  memberId: number;
  nickname: string;
  profileImgUrl?: string;
}

export enum DocStatus {
  EDITABLE = 'EDITABLE',
  VOTING = 'VOTING',
  DEBATING = 'DEBATING',
  PENDING = 'PENDING',
}

export interface Star {
  documentId: number;
  title: string;
  parentDocumentId: number;
  parentDocumentTitle: string;
  latestRevision: number;
  currentRevision: number;
  lastModifiedAt: string;
  sections: StarSection[];
  content: string;
  originalAuthor: StarContributor;
  contributors: StarContributor[];
}
