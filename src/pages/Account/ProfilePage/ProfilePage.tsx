import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "@/components/Button/Button";
import { profileSchema, type ProfileFormData } from "@/utils/validation";
import { userApi } from "@/services";
import { ProfileFormInput, PasswordFormInput } from "./FormInputs";
import { Link } from "react-router-dom";
import routes from "@/config/routes";

type ExtendedProfileFormData = ProfileFormData & {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export default function ProfilePage() {
  const [passwordChangeMode, setPasswordChangeMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ExtendedProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
    },
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const profileData = await userApi.getUserProfile();

        reset({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          address: profileData.address,
        });
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to fetch profile data. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, [reset]);

  const onSubmit = async (data: ExtendedProfileFormData) => {
    try {
      const profileData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: data.address,
      };

      if (passwordChangeMode && data.currentPassword && data.newPassword) {
        Object.assign(profileData, {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        });
      }

      await userApi.updateUserProfile(profileData);
      toast.success("Profile updated successfully!");
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile. Please try again."
      );
    }
  };

  return (
    <div className="app-container py-[40px]">
      <h2 className="text-[18px] font-semibold text-[#DB4444] mb-[24px]">
        Edit Your Profile
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-[20px]">
          <div className="grid grid-cols-2 gap-[20px]">
            <ProfileFormInput
              label="First Name"
              name="firstName"
              register={register}
              error={errors.firstName}
              placeholder="Enter your first name"
            />

            <ProfileFormInput
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName}
              placeholder="Enter your last name"
            />

            <ProfileFormInput
              label="Email"
              name="email"
              register={register}
              error={errors.email}
              type="email"
              placeholder="Enter your email"
              disabled={true}
            />

            <ProfileFormInput
              label="Address"
              name="address"
              register={register}
              error={errors.address}
              placeholder="Enter your address"
            />
          </div>

          <div className="space-y-[12px] mt-[16px]">
            <div className="flex justify-between items-center">
              <h3 className="text-[15px] font-medium text-gray-800">
                Password Changes
              </h3>
              <button
                type="button"
                onClick={() => setPasswordChangeMode(!passwordChangeMode)}
                className="text-[14px] text-blue-600 hover:text-blue-800"
              >
                {passwordChangeMode
                  ? "Cancel Password Change"
                  : "Change Password"}
              </button>
            </div>

            {passwordChangeMode && (
              <div className="space-y-[12px]">
                <PasswordFormInput
                  name="currentPassword"
                  register={register}
                  error={errors.currentPassword}
                  placeholder="Current Password"
                />

                <PasswordFormInput
                  name="newPassword"
                  register={register}
                  error={errors.newPassword}
                  placeholder="New Password"
                />

                <PasswordFormInput
                  name="confirmPassword"
                  register={register}
                  error={errors.confirmPassword}
                  placeholder="Confirm New Password"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-[12px] pt-[10px]">
            <Link
              to={routes.home}
              type="button"
              className="block text-gray-500 text-[15px] hover:text-black pr-8"
            >
              Cancel
            </Link>
            <Button
              type="submit"
              variant="primary"
              className="w-[214px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
