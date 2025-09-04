import React from "react";

type SectionHeaderProps = {
  label?: string;
  title: string;
  countdown?: React.ReactNode;
  rightSlot?: React.ReactNode;
  titleClassName?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  countdown,
  rightSlot,
  titleClassName = "text-[36px] font-extrabold",
}) => {
  return (
    <div className="mb-8">
      {/* Label */}
      {label && (
        <div className="flex items-center gap-2 mb-4">
          <span className="h-10 w-5 rounded-sm bg-primary" />
          <span className={`ml-4 font-extrabold text-primary`}>{label}</span>
        </div>
      )}

      {/* Title + Right */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h2 className={`${titleClassName}`}>{title}</h2>
          {countdown}
        </div>
        <div>{rightSlot}</div>
      </div>
    </div>
  );
};

export default SectionHeader;
