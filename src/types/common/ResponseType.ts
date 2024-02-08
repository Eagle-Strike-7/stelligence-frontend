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

export enum Heading {
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  H4 = 'H4',
  H5 = 'H5',
  H6 = 'H6',
}

export enum WriteType {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  CREATE = 'CREATE',
}
