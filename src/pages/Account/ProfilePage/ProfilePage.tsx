import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "@/components/Button/Button";
import { userApi } from "@/services/userApi";
import { useAuth } from "@/hooks/useAuth.ts";
import {
  profileSchema,
  passwordChangeSchema,
  type ProfileFormData,
  type PasswordChangeFormData,
} from "@/utils/validation";

import { AvatarUpload } from "./AvatarUpload";
import { Link } from "react-router-dom";
import routes from "@/config/routes";
import ProfileFormInput from "./FormInputs/ProfileFormInput";
import PasswordFormInput from "./FormInputs/PasswordFormInput";

export default function ProfilePage() {
  const { user, loadingUser, refreshMe } = useAuth();
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
    },
  });

  const passwordForm = useForm<PasswordChangeFormData>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      profileForm.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address || "",
      });

      setAvatarUrl(user.avatarUrl);
      setIsProfileLoading(false);
    } else {
      setIsProfileLoading(loadingUser);
    }
  }, [user, loadingUser, profileForm]);

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      const { firstName, lastName, address } = data;
      await userApi.updateUserProfile({ firstName, lastName, address });
      toast.success("Profile updated successfully!");

      await refreshMe();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile. Please try again."
      );
    }
  };

  const onPasswordSubmit = async (data: PasswordChangeFormData) => {
    try {
      const { currentPassword, newPassword } = data;
      await userApi.changePassword({ currentPassword, newPassword });
      toast.success("Password changed successfully!");
      setIsPasswordVisible(false);
      passwordForm.reset();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to change password. Please try again."
      );
    }
  };

  const handleAvatarChange = async (file: File) => {
    try {
      setIsAvatarUploading(true);
      const result = await userApi.uploadAvatar(file);
      setAvatarUrl(result.avatarUrl);
      toast.success("Avatar updated successfully!");

      await refreshMe();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to upload avatar. Please try again."
      );
    } finally {
      setIsAvatarUploading(false);
    }
  };

  return (
    <div className="app-container py-[40px] max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar - Avatar và navigation */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <AvatarUpload
              currentAvatarUrl={avatarUrl}
              onFileChange={handleAvatarChange}
              isLoading={isAvatarUploading}
            />

            <div className="space-y-2">
              <div className="font-medium text-gray-800">
                {profileForm.getValues("firstName")}{" "}
                {profileForm.getValues("lastName")}
              </div>
              <div className="text-sm text-gray-500">
                {profileForm.getValues("email")}
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <button
                className={`block w-full text-left p-2 rounded-md transition-colors ${
                  !isPasswordVisible
                    ? "bg-gray-100 text-gray-800"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsPasswordVisible(false)}
              >
                Profile Information
              </button>

              <button
                className={`block w-full text-left p-2 rounded-md transition-colors ${
                  isPasswordVisible
                    ? "bg-gray-100 text-gray-800"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsPasswordVisible(true)}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:col-span-3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-[18px] font-semibold text-[#DB4444] mb-6">
              {isPasswordVisible ? "Change Password" : "Edit Your Profile"}
            </h2>

            {isProfileLoading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
              </div>
            ) : isPasswordVisible ? (
              /* Password Change Form */
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="space-y-[20px]"
              >
                <PasswordFormInput
                  name="currentPassword"
                  register={passwordForm.register}
                  error={passwordForm.formState.errors.currentPassword}
                  placeholder="Current Password"
                  label="Current Password"
                />

                <PasswordFormInput
                  name="newPassword"
                  register={passwordForm.register}
                  error={passwordForm.formState.errors.newPassword}
                  placeholder="New Password"
                  label="New Password"
                />

                <PasswordFormInput
                  name="confirmPassword"
                  register={passwordForm.register}
                  error={passwordForm.formState.errors.confirmPassword}
                  placeholder="Confirm New Password"
                  label="Confirm Password"
                />

                <div className="flex items-center justify-end gap-[12px] pt-[20px]">
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(false)}
                    className="text-gray-500 text-[15px] hover:text-black mr-3"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-[214px]"
                    disabled={passwordForm.formState.isSubmitting}
                  >
                    {passwordForm.formState.isSubmitting
                      ? "Saving..."
                      : "Change Password"}
                  </Button>
                </div>
              </form>
            ) : (
              /* Profile Info Form */
              <form
                onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                className="space-y-[20px]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                  <ProfileFormInput
                    label="First Name"
                    name="firstName"
                    register={profileForm.register}
                    error={profileForm.formState.errors.firstName}
                    placeholder="Enter your first name"
                  />

                  <ProfileFormInput
                    label="Last Name"
                    name="lastName"
                    register={profileForm.register}
                    error={profileForm.formState.errors.lastName}
                    placeholder="Enter your last name"
                  />

                  <ProfileFormInput
                    label="Email"
                    name="email"
                    register={profileForm.register}
                    error={profileForm.formState.errors.email}
                    type="email"
                    placeholder="Enter your email"
                    disabled={true}
                  />

                  <ProfileFormInput
                    label="Address"
                    name="address"
                    register={profileForm.register}
                    error={profileForm.formState.errors.address}
                    placeholder="Enter your address"
                  />
                </div>

                <div className="flex items-center justify-end gap-[12px] pt-[20px]">
                  <Link
                    to={routes.home}
                    className="block text-gray-500 text-[15px] hover:text-black pt-2 mr-3"
                  >
                    Cancel
                  </Link>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-[214px]"
                    disabled={profileForm.formState.isSubmitting}
                  >
                    {profileForm.formState.isSubmitting
                      ? "Saving..."
                      : "Save Changes"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
