import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { useAuthStore } from "@/store/authStore";

export const authApi = axios.create({
  baseURL: "https://service.rmosweb.com",
});

export const api = axios.create({
  baseURL: "https://frontapi.rmosweb.com/api",
});

const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        useAuthStore.getState().logout();
      }
      return Promise.reject(error);
    }
  );
};

setupInterceptors(authApi);
setupInterceptors(api);
