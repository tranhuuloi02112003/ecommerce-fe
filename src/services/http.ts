import axios, { AxiosError, AxiosHeaders } from "axios";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { toast } from "react-toastify";

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 100000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const httpRefresh: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 100000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown | null, token?: string) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });

  failedQueue = [];
};

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      if (config.headers instanceof AxiosHeaders) {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
      } else {
        config.headers = new AxiosHeaders(config.headers);
        config.headers.set("Authorization", `Bearer ${accessToken}`);
      }
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as (typeof error.config & { _retry?: boolean });
    const isTokenExpired =
      error.response?.status === 401 || 403;


    if (isTokenExpired && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest._retry = true; 
            if (originalRequest.headers instanceof AxiosHeaders) {
              originalRequest.headers.set("Authorization", `Bearer ${token}`);
            } else {
              originalRequest.headers = new AxiosHeaders(
                originalRequest.headers
              );
              originalRequest.headers.set("Authorization", `Bearer ${token}`);
            }
            return http(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await httpRefresh.post("/api/auth/refresh-token");
        const newAccessToken = response.data.accessToken;

        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);

          processQueue(null, newAccessToken);

          if (originalRequest.headers instanceof AxiosHeaders) {
            originalRequest.headers.set(
              "Authorization",
              `Bearer ${newAccessToken}`
            );
          } else {
            originalRequest.headers = new AxiosHeaders(originalRequest.headers);
            originalRequest.headers.set(
              "Authorization",
              `Bearer ${newAccessToken}`
            );
          }

          return http(originalRequest);
        }
      } catch (refreshError) {

        processQueue(refreshError);
        localStorage.removeItem("accessToken");
        toast.error("Session expired. Please log in again.");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default http;
export { httpRefresh };
