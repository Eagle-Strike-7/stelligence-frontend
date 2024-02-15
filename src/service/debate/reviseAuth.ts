import apiClient from '../login/axiosClient';

export interface ReviseStateProps {
  documentId: number;
  documentStatus: 'EDITABLE' | 'VOTING' | 'DEBATING' | 'PENDING';
  contributeId: number;
  debateId: number;
}

interface ResponseType<T> {
  success: boolean;
  message: string;
  results: T;
}

// NOTE 문서 수정가능한지 상태 조회
export const getDocumentReviseState = async (
  documentId: number | undefined,
): Promise<ReviseStateProps> => {
  try {
    const response = await apiClient.get<ResponseType<ReviseStateProps>>(
      `/api/documents/${documentId}/status`,
    );
    if (response.data.success) {
      return response.data.results;
    }
    console.error('문서 수정 상태 조회 실패:', response.data.message);
    throw Error('문서 수정 상태 조회 에러');
  } catch (error) {
    console.error('문서 수정 상태 조회 실패(catch):', error);
    throw Error('문서 수정 상태 조회 에러');
  }
};
