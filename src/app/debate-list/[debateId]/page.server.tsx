import apiClient from '@/service/login/axiosClient';
import { ResponseType, StarResponseType } from '@/types/common/ResponseType';
import { DebateDetailItem } from '@/types/debate/debate';

export default async function getDebateData(
  debateId: number,
): Promise<DebateDetailItem> {
  try {
    const response = await apiClient.get<StarResponseType<DebateDetailItem>>(
      `/api/debates/${debateId}`,
    );
    if (!response.data.success) {
      throw Error('토론 상세 정보 가져오기에 실패했습니다');
    }
    return response.data.results;
  } catch (error) {
    throw Error('토론 상세 정보 가져오기에 실패했습니다.');
  }
}
