// TODO 기본 응답 타입을 results: T로, 배열 타입은 따로 지정하여 수정하기
export interface ResponseType<T> {
  success: boolean;
  message: string;
  results: T[];
}

export interface StarResponseType<T> {
  success: boolean;
  message: string;
  results: T;
}

export interface ErrorResponse<T> {
  success: boolean;
  message: string;
  results: T;
}

export enum Heading {
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
}

export enum WriteType {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  CREATE = 'CREATE',
}

export enum ContributeStatus {
  VOTING = 'VOTING',
  MERGED = 'MERGED',
  REJECTED = 'REJECTED',
  DEBATING = 'DEBATING',
}
