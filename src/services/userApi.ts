import http from "./http";
import { handleApiError } from "@/utils/errorHandler";

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}

export interface UpdateProfileRequest extends UserProfile {
  currentPassword?: string;
  newPassword?: string;
}

export const userApi = {
  getUserProfile: async (): Promise<UserProfile> => {
    try {
      const response = await http.get("/api/users/profile");
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error, "Failed to fetch user profile"));
    }
  },

  updateUserProfile: async (
    data: UpdateProfileRequest
  ): Promise<UserProfile> => {
    try {
      const response = await http.put("/api/users/profile", data);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error, "Failed to update user profile"));
    }
  },
};
