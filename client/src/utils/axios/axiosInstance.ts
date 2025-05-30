import axios from "axios";
import { getAuthToken, isTokenValid, clearAuthData } from "@/utils/auth/authutils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tracking 401 errors because i hadn't implemented the logic for certain endpoints, so this can prevent infinite redirect loops
let isRefreshing = false;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    const valid = isTokenValid();

    if (token && valid) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (!token || !valid) {
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 || error.response?.status === 403) {

      const errorMessage = error.response.data?.message?.toLowerCase() || "";
      const isTokenIssue =
        errorMessage.includes("token expired") ||
        errorMessage.includes("invalid token") ||
        errorMessage.includes("authentication failed");

      if (isTokenIssue && !originalRequest._retry && !isRefreshing) {
        isRefreshing = true;
        window.dispatchEvent(new Event("auth:expired"));
        clearAuthData();
        window.location.href = "/login";
      } else if (!isTokenIssue) {
        originalRequest._retry = true;
      }
    } else if (error.response) {
    } else {
    }

    isRefreshing = false;
    return Promise.reject(error);
  }
);

export default axiosInstance;