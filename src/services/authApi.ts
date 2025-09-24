import http from "./http";
import { handleApiError } from "@/utils/errorHandler";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AccessTokenResponse {
  accessToken: string;
}

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AccessTokenResponse> => {
    try {
      const response = await http.post<AccessTokenResponse>("/api/auth/token", {
        email: data.email,
        password: data.password,
      });
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }
      return response.data;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to login");
      console.error("❌ Login API error:", message);
      throw new Error(message);
    }
  },

  logout: async (): Promise<void> => {
    try {
      await http.post("/api/auth/logout");
      localStorage.removeItem("accessToken");
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to logout");
      console.error("❌ Logout API error:", message);
      throw new Error(message);
    }
  },

  refreshToken: async (): Promise<AccessTokenResponse> => {
    try {
      const response = await http.post<AccessTokenResponse>(
        "/api/auth/refresh"
      );
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }
      return response.data;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to refresh token");
      console.error("❌ Refresh Token API error:", message);
      throw new Error(message);
    }
  },
  register: async (data: RegisterRequest): Promise<UserResponse> => {
    try {
      const response = await http.post<UserResponse>(
        "/api/auth/register",
        data
      );
      return response.data;
    } catch (error: unknown) {
      const message = handleApiError(error, "Failed to register");
      console.error("❌ Register API error:", message);
      throw new Error(message);
    }
  },
};

export default authApi;
