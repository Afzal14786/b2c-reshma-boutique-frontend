import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { API_BASE_URL } from '../config/constants';

let refreshTokenFn: (() => Promise<string>) | null = null;

export const setRefreshTokenFn = (fn: () => Promise<string>) => {
  refreshTokenFn = fn;
};

export const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  // Request interceptor
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // If the data is FormData, remove the Content-Type header
      // so the browser can set it with the correct boundary.
      if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
      }

      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor with token refresh
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          if (refreshTokenFn) {
            const newToken = await refreshTokenFn();
            if (newToken) {
              localStorage.setItem('accessToken', newToken);
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return client(originalRequest);
            }
          }
        } catch (refreshError) {
          localStorage.removeItem('accessToken');
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createApiClient();