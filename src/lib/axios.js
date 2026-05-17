// lib/axios.js
import axios from "axios";
import Cookies from "js-cookie";
import allUrl from "../configs/allUrl.json";
import { runSingleRefresh } from "@/lib/runSingleRefresh";

const axiosInstance = axios.create({
  baseURL: allUrl.apiUrl,
  headers: {
    common: {
      platform: "web",
      lang: Cookies.get("NEXT_LOCALE") || "en",
    },
  },
});

// Request Interceptor - Add token based on current page context
axiosInstance.interceptors.request.use(
  async (config) => {
    // Skip attaching Authorization header for refresh token endpoints
    const url = config.url || "";
    if (url.includes("/auth/refresh") || url.includes("/admin/auth/refresh")) {
      return config;
    }

    const isServer = typeof window === "undefined";
    let token;

    let isAdminContext = false;

    if (!isServer && typeof window !== "undefined") {
      isAdminContext = window.location.pathname.includes("/admin");
    } else {
      isAdminContext = config.headers?.["x-admin-context"] === "true";
    }

    const tokenName = isAdminContext ? "AdminToken" : "UserToken";

    if (isServer) {
      try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        token = cookieStore.get(tokenName)?.value;
      } catch (error) {
        console.error("Error reading server cookies:", error);
      }
    } else {
      token = Cookies.get(tokenName);

      if (!token && axiosInstance.defaults.headers.common.Authorization) {
        const authHeader = axiosInstance.defaults.headers.common.Authorization;
        token = authHeader.replace("Bearer ", "");
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle 401 with token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401s, avoid infinite loops, skip refresh endpoint itself
    if (
      error?.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    // Determine token type from request context
    const isAdminContext =
      typeof window !== "undefined"
        ? window.location.pathname.includes("/admin")
        : originalRequest.headers?.["x-admin-context"] === "true";

    const refreshTokenName = isAdminContext
      ? "AdminRefreshToken"
      : "UserRefreshToken";
    const accessTokenName = isAdminContext ? "AdminToken" : "UserToken";
    // Use a single refresh endpoint for both user and admin
    const refreshEndpoint = "/auth/refresh";

    const currentRefreshToken = Cookies.get(refreshTokenName);

    // No refresh token — nothing we can do
    if (!currentRefreshToken) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newAccessToken = await runSingleRefresh(async () => {
        const response = await axiosInstance.post(
          refreshEndpoint,
          { refreshToken: currentRefreshToken },
          { headers: { Authorization: undefined } }
        );

        const { accessToken, refreshToken: newRefreshToken } =
          response.data?.data || {};

        if (!accessToken)
          throw new Error("No access token in refresh response");

        // Store new tokens
        Cookies.set(accessTokenName, accessToken, {
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          expires: 15 / (24 * 60), // 15 minutes
        });

        if (newRefreshToken) {
          Cookies.set(refreshTokenName, newRefreshToken, {
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            expires: 30, // 30 days
          });
        }

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        return accessToken;
      });

      // Retry original request with new token
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // Refresh failed — clean up and reject
      Cookies.remove(accessTokenName);
      Cookies.remove(refreshTokenName);
      delete axiosInstance.defaults.headers.common.Authorization;

      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;
