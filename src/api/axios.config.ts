import axios from 'axios';

import { ApiError } from './api-error';

export const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json',
    'X-Frame-Options': 'DENY',
  },
});

// Для tanstack-query
export const api: ApiClient = {
  get: <T>(url: string, params?: object): Promise<T> => axiosConfig.get(url, { params }),

  post: <T>(url: string, body?: unknown): Promise<T> => axiosConfig.post(url, body),

  put: <T>(url: string, body?: unknown): Promise<T> => axiosConfig.put(url, body),

  delete: <T>(url: string, body?: unknown): Promise<T> => axiosConfig.delete(url, { data: body }),
};

// axiosConfig.interceptors.request.use(
//   function (config) {
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );

axiosConfig.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (!res.success) {
      throw new ApiError(res.message ?? 'Unknown error', response.status, res.data);
    }

    return res.data;
  },
  (error) => {
    if (error.response) {
      const data = error.response.data;

      throw new ApiError(data?.message ?? 'Request failed', error.response.status, data?.data);
    }

    throw new ApiError('Network error', 500);
  },
);
