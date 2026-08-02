import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import { API_BASE_URL } from "../config/constants";

let refreshTokenFn: (() => Promise<string>) | null = null;

export const setRefreshTokenFn = (fn: () => Promise<string>) => {
  refreshTokenFn = fn;
};

// Shared across every request that 401s at the same moment, so a burst of
// simultaneous 401s triggers exactly one /auth/refresh call, not one each.
let refreshPromise: Promise<string> | null = null;

export const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  // Request interceptor
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // If the data is FormData, remove the Content-Type header
      // so the browser can set it with the correct boundary.
      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      }

      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response interceptor with token refresh
  client.interceptors.response.use(
    (response) => {
      // matched with backend reponse structure
      //   { success, statusCode, message, data, timestamp }
      // Every api/*.ts call site (and this codebase's types) expect
      // response.data to be the *payload* itself (e.g. res.data.user,
      // res.data.accessToken), not the outer envelope. Unwrap it here,
      // once, instead of every call site doing res.data.data.
      if (
        response.data &&
        typeof response.data === "object" &&
        "success" in response.data &&
        "data" in response.data
      ) {
        // Keep the envelope's message around in case a caller wants it
        // for a success toast later (e.g. "Product created successfully").
        (response as any).apiMessage = response.data.message;
        response.data = response.data.data;
      }
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // The /auth/refresh call itself goes through this same client. If the
      // refresh token cookie is missing/invalid, THIS request also 401s —
      // without this check, that 401 re-enters this branch and calls
      // refreshTokenFn() again, which calls /auth/refresh again, forever.
      const isRefreshCall = originalRequest?.url?.includes("/auth/refresh");

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !isRefreshCall
      ) {
        originalRequest._retry = true;
        try {
          if (refreshTokenFn) {
            if (!refreshPromise) {
              refreshPromise = refreshTokenFn().finally(() => {
                refreshPromise = null;
              });
            }
            const newToken = await refreshPromise;
            if (newToken) {
              localStorage.setItem("accessToken", newToken);
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return client(originalRequest);
            }
          }
        } catch (refreshError) {
          localStorage.removeItem("accessToken");
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    },
  );

  return client;
};

export const apiClient = createApiClient();
