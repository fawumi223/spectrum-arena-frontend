import axios from "axios";

// ✅ FORCE production backend (no env confusion)
const BASE = "https://glistening-healing-production-30d3.up.railway.app/api/";

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

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      if (!refresh) {
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(error);
      }

      try {
        const refreshRes = await axios.post(`${BASE}token/refresh/`, {
          refresh,
        });

        const newAccess = refreshRes.data.access;

        localStorage.setItem("access", newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);

      } catch (refreshErr) {
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
