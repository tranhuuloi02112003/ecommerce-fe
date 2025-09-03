import type { InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

interface FormInputAuthProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register: any;
  error?: FieldError;
  type?: string;
}

export default function FormInputAuth({
  label,
  name,
  register,
  error,
  type = "text",
  ...props
}: FormInputAuthProps) {
  return (
    <div className="relative">
      <input
        type={type}
        id={name}
        className={`block py-2.5 px-0 w-full text-[16px] text-gray-900 bg-transparent 
        border-0 border-b-2 appearance-none focus:outline-none focus:ring-0
        transition-colors duration-200
        ${
          error
            ? "border-amber-500 focus:border-amber-600"
            : "border-gray-300 focus:border-gray-700"
        }
        peer dark:text-gray-100`}
        placeholder=" "
        {...register(name)}
        {...props}
      />
      <label
        htmlFor={name}
        className={`absolute text-[16px] duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] 
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:font-medium
        peer-[:not(:placeholder-shown)]:font-medium
        ${error ? "text-gray-700" : "text-gray-500 peer-focus:text-gray-700"}`}
      >
        {label}
      </label>
      <div className="min-h-[42px] mt-1">
        {error && (
          <p className="text-[13px] text-red-500 flex items-center gap-1">
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
    </div>
  );
}
