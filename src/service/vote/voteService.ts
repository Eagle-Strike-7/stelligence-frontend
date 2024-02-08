import apiClient from '../login/axiosClient';

// NOTE 공통 타입으로 분리하기
enum AmendmentType {
  UPDATE = 'UPDATE',
  CREATE = 'CREATE',
  DELETE = 'DELETE',
}
enum Heading {
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  H4 = 'H4',
  H5 = 'H5',
  H6 = 'H6',
}
enum ContributeStatus {
  VOTING = 'VOTING',
  MERGED = 'MERGED',
  REJECTED = 'REJECTED',
  DEBATING = 'DEBATING',
}

interface AmendmentData {
  amendmentId: number;
  type: AmendmentType;
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
interface ReviseDataResponse {
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
}

// NOTE 수정요청 조회
const getReviseData = async (
  contributeId: number,
): Promise<ReviseDataResponse | null> => {
  try {
    const response = await apiClient.get(`api/contributes/`, {
      params: {
        contributeId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('수정요청 조회 실패: ', error);
    return null;
  }
};

export default getReviseData;
