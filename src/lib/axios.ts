// lib/axios.ts

import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";


interface QueueItem {
  resolve: (value: string | null) => void;
  reject: (error: Error) => void;
}

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Required for cookies
});


let isRefreshing = false;

let failedQueue: QueueItem[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};


// NOTE: We don't get token from localStorage anymore
// Token will be managed by UserProvider and set via api.defaults.headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
   
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Check if error is unauthorized (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Check if this is already a refresh request to avoid infinite loop
      if (originalRequest.url?.includes("/refresh")) {
        // Refresh token itself is invalid/expired
        // Clear everything and redirect to login
        delete api.defaults.headers.common["Authorization"];
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If we're already refreshing, add request to queue
        try {
          const token = await new Promise<string | null>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          
          if (!token) {
            throw new Error("No token received");
          }
          
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token using refreshToken cookie
        // The cookie is automatically sent because withCredentials: true
        const response = await api.post("/users/refresh");

        const { accessToken } = response.data;

        if (!accessToken) {
          throw new Error("No access token received");
        }

        // Update authorization header for future requests
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Process queued requests with new token
        processQueue(null, accessToken);

        // Retry original request with new token
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh failed, clear everything
        delete api.defaults.headers.common["Authorization"];
        
        // Process queue with error
        processQueue(
          refreshError instanceof Error
            ? refreshError
            : new Error("Failed to refresh token"),
          null
        );

        // Redirect to login
        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;