import axios from "axios";

// Development (local Django backend)
const DEV_BASE = "http://127.0.0.1:8000/api/";

// Production (Railway backend)
const PROD_BASE = "https://web-production-bc7396.up.railway.app/api/";

// Automatically select base URL based on environment
const BASE =
  process.env.NODE_ENV === "development"
    ? DEV_BASE
    : PROD_BASE;

const api = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.removeItem("access");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

