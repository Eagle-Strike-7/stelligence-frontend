import { NewStar } from '@/types/star/NewStarProps';
import { StarResponseType } from '@/types/common/ResponseType';
import { Star } from '@/types/star/StarProps';
import apiClient from '../login/axiosClient';

const postNewStar = async (star: NewStar): Promise<StarResponseType<Star>> => {
  try {
    const response = await apiClient.post(
      `/api/documents`,
      JSON.stringify(star),
    );
    return response.data;
  } catch (error) {
    console.error('글 작성요청 에러 발생', error);
    throw Error('글 작성 실패');
  }
};

export default postNewStar;
