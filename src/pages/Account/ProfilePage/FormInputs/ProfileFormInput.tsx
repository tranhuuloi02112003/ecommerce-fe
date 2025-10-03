import type { UseFormRegister } from "react-hook-form";

interface ProfileFormInputProps {
  label: string;
  name: "firstName" | "lastName" | "email" | "address";
  register: UseFormRegister<any>;
  error?: { message?: string };
  type?: string;
  disabled?: boolean;
  placeholder?: string;
}

const ProfileFormInput = ({
  label,
  name,
  register,
  error,
  type = "text",
  disabled = false,
  placeholder,
}: ProfileFormInputProps) => {
  return (
    <div>
      <label className="block text-[14px] font-medium mb-[8px]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-[4px] h-[40px] px-[12px] ${disabled ? "bg-gray-100" : ""}`}
        {...register(name)}
      />
      {error && (
        <p className="text-[13px] text-red-500 mt-1 flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[16px] w-[16px] inline"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z"
              clipRule="evenodd"
            />
          </svg>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default ProfileFormInput;