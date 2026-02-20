import axios from "axios";

// Development backend
const DEV_BASE = "http://127.0.0.1:8000/api/";

// Production backend
const PROD_BASE = "https://web-production-bc7396.up.railway.app/api/";

// Auto-select base URL
const BASE = process.env.NODE_ENV === "development" ? DEV_BASE : PROD_BASE;

const api = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------------------------------------------
// Attach Access Token
// ---------------------------------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    // Do NOT attach token to auth endpoints
    if (
      token &&
      !config.url.includes("/users/login") &&
      !config.url.includes("/users/signup") &&
      !config.url.includes("/token/refresh")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------------------------------------------
// Handle 401 responses + token refresh
// ---------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const originalRequest = error.config;

    // Only attempt refresh once
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      if (!refresh) {
        // logout → go to landing page
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(error);
      }

      try {
        const refreshRes = await axios.post(`${BASE}token/refresh/`, {
          refresh,
        });

        const newAccess = refreshRes.data.access;

        // Save new access token
        localStorage.setItem("access", newAccess);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);

      } catch (refreshErr) {
        // Refresh failed → full logout
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

