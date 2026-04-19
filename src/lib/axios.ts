import axios from "axios";
import { notify } from "./taost";

const BASE_URL = process.env.NODE_ENV === "production" ? "https://elimu-stack-backend.onrender.com" : "http://localhost:5000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      'Something went wrong';

    notify.error(message);

    return Promise.reject(error);
  }
);

export default apiClient;
