export interface ResponseType<T> {
  success: boolean;
  message: string;
  results: T[];
}
