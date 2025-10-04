import { useRef } from "react";

export interface AvatarUploadProps {
  currentAvatarUrl?: string;
  onFileChange: (file: File) => void;
  isLoading?: boolean;
}

export const AvatarUpload = ({
  currentAvatarUrl,
  onFileChange,
  isLoading = false,
}: AvatarUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileChange(files[0]);
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const defaultAvatar =
    "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";
  const avatarSrc = currentAvatarUrl || defaultAvatar;

  return (
    <div className="flex flex-col items-center mb-[24px]">
      {/* Avatar */}
      <div
        className="relative cursor-pointer transition-all duration-300"
        onClick={triggerFileSelect}
      >
        <div className="w-[112px] h-[112px] rounded-full overflow-hidden transition-all duration-300 border-[2px] border-gray-300 hover:border-[#DB4444]">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-[32px] w-[32px] border-b-[2px] border-red-500"></div>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 rounded-full flex items-center justify-center">
                <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[40px] w-[40px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <img
                src={avatarSrc}
                alt="User Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultAvatar;
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* Upload Button */}
      <div className="mt-[16px]">
        <button
          type="button"
          onClick={triggerFileSelect}
          disabled={isLoading}
          className="text-[#DB4444] font-medium text-[14px] hover:underline flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[16px] w-[16px] mr-[4px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          Change Profile Picture
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};
