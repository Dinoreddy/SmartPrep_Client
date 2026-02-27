/**
 * axios.ts
 * --------
 * Configured axios instance for SmartPrep API.
 *
 * Token strategy: httpOnly cookies only.
 *   - `withCredentials: true` ensures cookies are sent on every request.
 *   - No Authorization header needed — server reads the accessToken cookie.
 *   - On 401, we call /auth/refresh-token (the browser sends the refreshToken
 *     cookie automatically), then retry the original request.
 */

import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/v1",
  withCredentials: true, // sends all cookies automatically on every request
});

// ─── Response Interceptor — 401 / Token Refresh ───────────────────────────────

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(null)));
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config as typeof error.config & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !original._retry) {
      // Queue up any additional 401s while a refresh is in flight
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(original))
          .catch(Promise.reject);
      }

      original._retry = true;
      isRefreshing = true;

      try {
        // No body needed — the server reads the refreshToken cookie automatically
        const { data } = await axios.post(
          import.meta.env.VITE_API_BASE_URL + "/api/v1/auth/refresh-token",
          {},
          { withCredentials: true },
        );

        // Update the user in the store (server returns fresh user data)
        useAuthStore.getState().setUser(data.data.user);

        processQueue(null);
        return api(original);
      } catch (err) {
        processQueue(err);
        // Refresh failed — session is dead, send user to login
        useAuthStore.getState().clearAuth();
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
