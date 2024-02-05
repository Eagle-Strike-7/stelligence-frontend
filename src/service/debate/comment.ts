import axios from 'axios';

export interface Comment {
  id: number;
  content: string;
}

export const createComment: (content: string) => Comment = (
  content: string,
) => {
  return {
    id: Date.now(),
    content,
  };
};

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
