import http from "./http";
import { handleApiError } from "@/utils/errorHandler";
import { filesApi } from "./filesApi";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  avatarUrl?: string;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  address?: string;
}

export interface UpdateAvatarRequest {
  avatarUrl: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const userApi = {
  getUserProfile: async (): Promise<UserProfile> => {
    try {
      const response = await http.get("/api/users/me");
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error, "Failed to fetch user profile"));
    }
  },

  updateUserProfile: async (data: UpdateProfileRequest): Promise<void> => {
    try {
      await http.put("/api/users/me", data);
    } catch (error) {
      throw new Error(handleApiError(error, "Failed to update user profile"));
    }
  },

  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    try {
      await http.post("/api/users/me/change-password", data);
    } catch (error) {
      throw new Error(handleApiError(error, "Failed to change password"));
    }
  },

  uploadAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
    try {
      const fileUrls = await filesApi.uploadFiles([file]);

      if (!fileUrls || fileUrls.length === 0) {
        throw new Error("Failed to upload avatar: No URL returned");
      }

      const avatar = fileUrls[0];
      await http.put("/api/users/me/avatar", { avatarKey: avatar.key });

      return { avatarUrl: avatar.url };
    } catch (error) {
      throw new Error(handleApiError(error, "Failed to upload avatar"));
    }
  },
};
