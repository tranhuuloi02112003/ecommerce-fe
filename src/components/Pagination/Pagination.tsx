interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex items-center justify-center gap-[8px] ${className}`}>
      <button
        disabled={currentPage === 1}
        onClick={handlePrevious}
        className="rounded-[8px] border px-[12px] py-[6px] text-[14px] disabled:opacity-50 hover:bg-gray-50 transition-colors"
      >
        Prev
      </button>

      <div className="rounded-[8px] border px-[12px] py-[6px] text-[14px] bg-gray-50">
        Page {currentPage} / {totalPages}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={handleNext}
        className="rounded-[8px] border px-[12px] py-[6px] text-[14px] disabled:opacity-50 hover:bg-gray-50 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
