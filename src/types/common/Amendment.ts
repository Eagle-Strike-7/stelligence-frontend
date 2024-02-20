import { WriteType } from './ResponseType';

export interface Contributor {
  memberId: number;
  nickname: string;
  profileImgUrl: string;
}

export interface Amendment {
  amendmentId: number;
  type: WriteType;
  targetSection: Section;
  requestedSectionHeading: string;
  requestedSectionTitle: string;
  requestedSectionContent: string;
  creatingOrder: number;
}

interface Section {
  sectionId: number;
  revision: number;
  heading: string;
  title: string;
  content: string;
}

export interface Contribute {
  contributeId: number;
  contributeTitle: string;
  contributeDescription: string;
  documentId: number;
  contributor: Contributor;
  amendments: Amendment[];
  beforeDocumentTitle: string;
  afterDocumentTitle: string;
  beforeParentDocumentId: number;
  beforeParentDocumentTitle: string;
  afterParentDocumentId: number;
  afterParentDocumentTitle: string;
  contributeStatus: 'VOTING';
  documentTitle: string;
  parentDocumentId: number;
  parentDocumentTitle: string;
  relatedDebateId: number;
  endAt: string;
}
