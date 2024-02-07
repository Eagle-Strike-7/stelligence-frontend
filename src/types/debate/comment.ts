export interface CommentCreateProps {
  id: number;
  content: string;
}

export interface Commenter {
  memberId: number;
  nickname: string;
  profileImgUrl: string;
}

export interface CommentProps {
  commentId: number;
  content: string;
  createdAt: string;
  sequence: number;
  commenter: Commenter;
}

export interface CommentApiResponse {
  success: boolean;
  message: string;
  results: CommentProps[];
}
