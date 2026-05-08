import axios from "axios";

const baseURL = `http://${import.meta.env.DOMAIN_NAME}:${import.meta.env.FRONTEND_PORT}/api`;

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
