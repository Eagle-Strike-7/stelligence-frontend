import { Heading, WriteType } from '../common/ResponseType';

export enum State {
  읽기 = '읽기',
  수정 = '수정',
  추가 = '추가',
  삭제 = '삭제',
}

export interface Amendment {
  sectionId: number;
  type: WriteType;
  newSectionHeading: Heading;
  newSectionTitle: string;
  newSectionContent: string;
  creatingOrder: number;
}

export interface ReviseStar {
  contributeTitle: string;
  contributeDescription: string;
  amendments: Amendment[];
  documentId: number;
  afterDocumentTitle: string;
  afterParentDocumentId: number;
}
