import axios from "axios";
import "dotenv/config"

const BASE_URL = process.env.NODE_ENV === "production" ? "https://elimu-stack-backend.onrender.com" : "http://localhost:5000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  }
});

export default apiClient;
