import http from "./http";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AccessTokenResponse {
  accessToken: string;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AccessTokenResponse> => {
    const response = await http.post<AccessTokenResponse>("/api/auth/token", {
      email: data.email,
      password: data.password,
    });

    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }

    return response.data;
  },

  logout: async (): Promise<void> => {
    await http.post("/api/auth/logout");
    localStorage.removeItem("accessToken");
  },

  refreshToken: async (): Promise<AccessTokenResponse> => {
    const response = await http.post<AccessTokenResponse>("/api/auth/refresh");

    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }

    return response.data;
  },
};

export default authApi;
