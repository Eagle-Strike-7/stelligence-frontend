import { AxiosResponse } from 'axios';
import { Heading, WriteType } from '@/types/common/ResponseType';
import apiClient from '../login/axiosClient';

// NOTE 공통 타입으로 분리하기
enum ContributeStatus {
  VOTING = 'VOTING',
  MERGED = 'MERGED',
  REJECTED = 'REJECTED',
  DEBATING = 'DEBATING',
}

interface AmendmentData {
  amendmentId: number;
  type: WriteType;
  targetSection: {
    sectionId: number;
    revision: number;
    heading: Heading;
    title: string;
    content: string;
  };
  requestedSectionHeading: Heading;
  requestedSectionTitle: string;
  requestedSectionContent: string;
  creatingOrder: number;
}
export interface ReviseDataResponse {
  message: string;
  success: boolean;
  results: {
    contributeId: number;
    contributeTitle: string;
    contributeDescription: string;
    contributeStatus: ContributeStatus;
    documentId: number;
    documentTitle: string;
    parentDocumentId: number;
    contributor: {
      memberId: number;
      nickname: string;
      profileImgUrl: string;
    };
    amendments: AmendmentData[];
    beforeDocumentTitle: string;
    afterDocumentTitle: string;
    beforeParentDocumentId: number;
    beforeParentDocumentTitle: string;
    afterParentDocumentId: number;
    afterParentDocumentTitle: string;
    endAt: string;
    relatedDebateId: number;
  };
}
export interface VoteResponse {
  message: string;
  success: boolean;
  results: {
    agreeCount: number;
    disagreeCount: number;
    myVote: boolean;
  };
}

// NOTE 수정요청 조회
export const getReviseData = async (
  contributeId: number,
): Promise<ReviseDataResponse> => {
  try {
    const response = await apiClient.get(`/api/contributes/${contributeId}`);
    return response.data;
  } catch (error) {
    console.error('수정요청 조회 실패: ', error);
    throw error;
  }
};

// NOTE 수정요청 삭제
export const deleteReviseData = async (
  contributeId: number,
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.delete(`/api/contributes/${contributeId}`);
    return response.data;
  } catch (error) {
    console.error('수정요청 삭제 실패', error);
    throw error;
  }
};

// NOTE 투표 현황 조회하기
export const getVoteData = async (
  contributeId: number,
): Promise<VoteResponse> => {
  try {
    const response = await apiClient.get(
      `/api/contributes/${contributeId}/votes`,
    );
    return response.data;
  } catch (error) {
    console.error('투표 현황 조회 실패: ', error);
    throw error;
  }
};

// NOTE 투표 생성하기
export const postVote = async ({
  contributeId,
  isAgree,
}: {
  contributeId: number;
  isAgree: boolean;
}): Promise<VoteResponse> => {
  try {
    const response = await apiClient.post('/api/votes', {
      contributeId,
      agree: isAgree,
    });
    return response.data;
  } catch (error) {
    console.error('투표 생성 실패: ', error);
    throw error;
  }
};
