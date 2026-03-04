// declare type ApiResponse<T> = {
//   success: boolean;
//   message: string | null;
//   data: T;
// };

declare type ApiError = import('axios').AxiosError<{
  success: false;
  message: string;
  data: unknown;
}>;

declare type ApiClient = {
  get<T>(url: string, params?: object): Promise<T>;
  post<T>(url: string, body?: unknown): Promise<T>;
  put<T>(url: string, body?: unknown): Promise<T>;
  delete<T>(url: string, body?: unknown): Promise<T>;
};
