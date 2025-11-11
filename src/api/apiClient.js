import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT if user is logged in
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

