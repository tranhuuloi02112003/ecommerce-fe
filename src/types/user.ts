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
