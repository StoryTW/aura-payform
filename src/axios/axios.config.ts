import axios from 'axios';

export const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosConfig.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosConfig.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  function onRejected(error) {
    return Promise.reject(error);
  },
);
