import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/v1",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) =>
          failedQueue.push({ resolve, reject }),
        )
          .then(() => api(original))
          .catch(Promise.reject);
      }
      original._retry = true;
      isRefreshing = true;
      try {
        await api.post("/auth/refresh-token");
        processQueue(null);
        return api(original);
      } catch (err) {
        processQueue(err);
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
