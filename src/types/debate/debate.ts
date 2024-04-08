import { Contribute } from '../common/Amendment';

export interface DebateListItem {
  debateId: number;
  createdAt: string;
  endAt: string;
  documentId: number;
  documentTitle: string;
  contributeId: number;
  contributeTitle: string;
  commentsCount: number;
  contributor: {
    memberId: number;
    nickname: string;
    profileImgUrl: string;
  };
}

export interface DebateApiResults {
  debates: DebateListItem[];
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export interface DebateDetailItem {
  debateId: number;
  createdAt: string;
  endAt: string;
  status: 'OPEN' | 'CLOSED';
  contribute: Contribute;
}
