import { ContributeStatus } from '@/types/common/ResponseType';
import apiClient from '../login/axiosClient';

export interface SpecificReviseData {
  contributeId: number;
  contributeTitle: string;
  contributeDescription: string;
  contributeStatus: ContributeStatus;
  documentId: number;
  documentTitle: string;
  contributorId: number;
  contributorNickname: string;
  voteSummary: {
    agreeCount: number;
    disagreeCount: number;
  };
  createdAt: string;
}

export interface SpecificReviseResponse {
  success: boolean;
  message: string;
  results: {
    contributes: SpecificReviseData[];
    totalPages: number;
    totalElements: number;
    size: number;
    currentPage: number;
    firstPage: boolean;
    lastPage: boolean;
  };
}
const getSpecificReviseData = async ({
  documentId,
  activeTab,
  page,
}: {
  documentId: number;
  activeTab: string;
  page: number;
}): Promise<SpecificReviseResponse> => {
  try {
    const merged: boolean = activeTab === '반영 완료';
    const response = await apiClient.get<SpecificReviseResponse>(
      '/api/contributes',
      {
        params: {
          documentId,
          merged,
          page,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('특정 글 수정요청 목록 조회 실패: ', error);
    throw error;
  }
};

export default getSpecificReviseData;
