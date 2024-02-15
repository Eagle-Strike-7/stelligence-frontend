import apiClient from '../login/axiosClient';

interface Props {
  documentId: number;
  documentStatus: 'EDITABLE' | any;
  contributeId: number;
  debateId: number;
}

interface ResponseType<T> {
  success: boolean;
  message: string;
  results: T;
}

// NOTE 문서 수정가능한지 상태 조회
const getDocumentReviseState = async (
  documentId: number | undefined,
): Promise<Props | null> => {
  try {
    const response = await apiClient.get<ResponseType<Props>>(
      `/api/documents/${documentId}/status`,
    );
    if (response.data.success) {
      return response.data.results;
    } 
      console.error('문서 수정 상태 조회 실패:', response.data.message);
      return null;
    
  } catch (error) {
    console.error('문서 수정 상태 조회 실패(catch):', error);
    return null;
  }
};

export default getDocumentReviseState;
