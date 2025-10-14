import React from "react";

interface NotesInputProps {
  value: string;
  onChange: (value: string) => void;
}

const NotesSection: React.FC<NotesInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-[32px]">
      <h2 className="mb-[16px] text-[18px] font-medium text-gray-900">
        Additional Notes
      </h2>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[8px] border border-gray-300 px-4 py-2 focus:border-[#DB4444] focus:outline-none"
        placeholder="Notes about your order, e.g. special notes for delivery"
        rows={4}
      />
    </div>
  );
};

export default NotesSection;
