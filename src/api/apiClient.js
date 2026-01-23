import axios from "axios";

const API_BASE =
  process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ------------------------------------------------------------------
   REQUEST INTERCEPTOR → ATTACH ACCESS TOKEN
------------------------------------------------------------------- */
apiClient.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");

    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ------------------------------------------------------------------
   RESPONSE INTERCEPTOR → AUTO REFRESH TOKEN
------------------------------------------------------------------- */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      if (!refresh) {
        forceLogout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization =
              "Bearer " + token;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const res = await axios.post(
          `${API_BASE}/token/refresh/`,
          { refresh }
        );

        const newAccess = res.data.access;

        localStorage.setItem("access", newAccess);

        apiClient.defaults.headers.Authorization =
          "Bearer " + newAccess;

        processQueue(null, newAccess);

        originalRequest.headers.Authorization =
          "Bearer " + newAccess;

        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        forceLogout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/* ------------------------------------------------------------------
   FORCE LOGOUT (SECURITY)
------------------------------------------------------------------- */
function forceLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");

  window.location.href = "/login";
}

export default apiClient;

