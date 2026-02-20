declare type BasicErrorModel = import('axios').AxiosError<{
  errors?: unknown;
  message?: string;
}>;
