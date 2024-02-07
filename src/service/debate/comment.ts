import { CommentApiResponse, CommentProps } from '@/types/debate/comment';
import axios from 'axios';

// NOTE 댓글 리스트 조회
export const getCommentList = async (
  debateId: number,
): Promise<CommentProps[]> => {
  try {
    const response = await axios.get<CommentApiResponse>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/debates/${debateId}/comments`,
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
export const createComment = async (newContent: string, debateId: number) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/debates/${debateId}/comments`,
      {
        content: newContent,
      },
    );
    return response.data;
  } catch (error) {
    console.error('댓글 수정 중 오류 발생:', error);
    throw error;
  }
};
// NOTE 댓글 수정
export const updateComment = async (
  commentId: number,
  newContent: string,
  debateId: number,
) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/debates/${debateId}/comments/${commentId}`,
      {
        content: newContent,
      },
    );
    return response.data;
  } catch (error) {
    console.error('댓글 수정 중 오류 발생:', error);
    throw error;
  }
};

// NOTE 댓글 삭제
export const deleteComment = async (
  commentId: number,
  debateId: number,
): Promise<boolean> => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/debates/${debateId}/comments/${commentId}`,
    );
    return true; // 삭제 성공
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error);
    throw error;
  }
};
