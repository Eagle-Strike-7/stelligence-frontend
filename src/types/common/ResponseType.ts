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
