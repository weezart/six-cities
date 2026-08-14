import axios, { AxiosInstance, isAxiosError } from 'axios';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';
import { dropToken, getToken } from './token';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers['x-token'] = token;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (isAxiosError(error) && error.response?.status === 401) {
        dropToken();
      }
      return Promise.reject(error);
    },
  );

  return api;
};
