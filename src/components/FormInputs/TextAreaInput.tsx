import type { UseFormRegister } from "react-hook-form";

interface TextAreaInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: { message?: string };
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
}

const TextAreaInput = ({
  label,
  name,
  register,
  error,
  disabled = false,
  placeholder,
  rows = 4,
}: TextAreaInputProps) => {
  return (
    <div>
      <label className="block text-[14px] font-medium mb-2">{label}</label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full border ${
          error ? "border-red-400/70" : "border-gray-200"
        } rounded-[8px] px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#DB4444]/50 focus:border-[#DB4444]/70 transition min-h-[120px] ${
          disabled ? "bg-gray-100" : ""
        } bg-white`}
        {...register(name)}
      />
      {error && (
        <p className="text-[12px] text-red-400 mt-2 flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 inline opacity-80"
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

export default TextAreaInput;
