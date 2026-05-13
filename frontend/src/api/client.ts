import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { BACKEND_URL, API_BASE_URL } from "../config/env";
import { API_PATHS } from "../config/api";


const apiClient = axios.create({
  baseURL: `${BACKEND_URL}${API_BASE_URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & 
      { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("Refresh token not found!");

        const response = await 
          axios.post(API_PATHS.AUTH.TOKEN_REFRESH, { refreshToken });
        const { access_token, refresh_token } = response.data;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Cannot refresh token. Exit...", refreshError);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError)
      }
    } else if (error.response?.status === 403) {
      // No priveleges
    } else if (!error.response) {
      // Network error
    } else if (error.response.status >= 500) {
      // Internal error
    }

    return Promise.reject(error);
  }
);

export default apiClient;
