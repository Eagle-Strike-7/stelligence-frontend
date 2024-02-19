import { CommentApiResponse, CommentProps } from '@/types/debate/comment';
import apiClient from '../login/axiosClient';

// NOTE 댓글 리스트 조회
export const getCommentList = async (
  debateId: number,
): Promise<CommentProps[]> => {
  try {
    const response = await apiClient.get<CommentApiResponse>(
      `/api/debates/${debateId}/comments`,
    );

    if (response.data.success) {
      return response.data.results;
    }
    console.error('Fetching comments failed:', response.data.message);
    return [];
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

// NOTE 댓글 생성
export const postNewComment = async (newContent: string, debateId: number) => {
  try {
    const response = await apiClient.post(`/api/debates/${debateId}/comments`, {
      content: newContent,
    });
    return response.data;
  } catch (error) {
    console.error('댓글 생성 중 오류 발생:', error);
    throw Error('댓글 생성 실패');
  }
};

export interface UpdateCommentArgs {
  commentId: number;
  newContent: string;
  debateId: number;
}

// NOTE 댓글 수정
export const updateComment = async ({
  commentId,
  newContent,
  debateId,
}: UpdateCommentArgs): Promise<any> => {
  try {
    const response = await apiClient.patch(
      `/api/debates/${debateId}/comments/${commentId}`,
      {
        content: newContent,
      },
    );
    return response.data;
  } catch (error) {
    console.error('댓글 수정 중 오류 발생:', error);
    throw new Error('댓글 수정 실패');
  }
};

export interface DeleteCommentArgs {
  commentId: number;
  debateId: number;
}

// NOTE 댓글 삭제
export const deleteComment = async ({
  commentId,
  debateId,
}: DeleteCommentArgs): Promise<void> => {
  try {
    await apiClient.delete(`/api/debates/${debateId}/comments/${commentId}`);
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error);
    throw new Error('댓글 삭제 실패');
  }
};
