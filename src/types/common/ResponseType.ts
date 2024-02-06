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
