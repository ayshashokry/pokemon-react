import PaginationInfo from "./PaginationInfo";

export default function Pagination({
  page,
  total,
  perPage,
  next,
  previous,
  onChange,
}: {
  page: number;
  total: number;
  perPage: number;
  next: string | null;
  previous: string | null;
  onChange: (p: number) => void;
}) {
  const totalPages = Math.ceil(total / perPage);

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 5; i++) pages.push(i);
      } else if (page >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        for (let i = page - 2; i <= page + 2; i++) pages.push(i);
      }
    }
    return pages;
  };

  const handlePrevious = () => {
    if (previous) {
      onChange(page - 1);
    }
  };

  const handleNext = () => {
    if (next) {
      onChange(page + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="flex gap-1 sm:gap-2 items-center flex-wrap justify-center">
        <button
          onClick={handlePrevious}
          disabled={!previous}
          className="px-2 sm:px-3 py-1 cursor-pointer rounded bg-white shadow disabled:opacity-50 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
        >
          &lt; <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Prev</span>
        </button>

        <div className="flex gap-1 items-center flex-wrap justify-center">
          {getPageNumbers().map((p) => (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={`px-2 sm:px-3 py-1 rounded shadow cursor-pointer text-xs sm:text-sm min-w-8 sm:min-w-9 ${
                p === page
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}

          {!getPageNumbers().includes(totalPages) && (
            <>
              <span className="px-1 sm:px-2 text-xs sm:text-sm">...</span>
              <button
                onClick={() => onChange(totalPages)}
                className="px-2 sm:px-3 py-1 rounded shadow cursor-pointer bg-white hover:bg-gray-100 text-xs sm:text-sm min-w-8 sm:min-w-9"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={!next}
          className="px-2 sm:px-3 py-1 cursor-pointer rounded bg-white shadow disabled:opacity-50 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden">Next</span> &gt;
        </button>
      </div>
      <PaginationInfo page={page} totalPages={totalPages} perPage={perPage} />
    </div>
  );
}
