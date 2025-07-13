import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const pageRangeDisplayed = 2;
  const marginPagesDisplayed = 1;

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPage && page !== currentPage) {
      onPageChange(page);
    }
  };

  const generatePages = () => {
    const pages: (number | "...")[] = [];

    const startRange = Math.max(
      marginPagesDisplayed + 1,
      currentPage - Math.floor(pageRangeDisplayed / 2)
    );
    const endRange = Math.min(
      totalPage - marginPagesDisplayed,
      currentPage + Math.floor(pageRangeDisplayed / 2)
    );

    for (let i = 1; i <= marginPagesDisplayed; i++) {
      pages.push(i);
    }

    if (startRange > marginPagesDisplayed + 1) {
      pages.push("...");
    }

    for (let i = startRange; i <= endRange; i++) {
      pages.push(i);
    }

    if (endRange < totalPage - marginPagesDisplayed) {
      pages.push("...");
    }

    for (let i = totalPage - marginPagesDisplayed + 1; i <= totalPage; i++) {
      if (i > marginPagesDisplayed && !pages.includes(i)) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex space-x-2 w-fit mx-auto my-4 items-center">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeft size={16} className="text-blue-800 dark:text-blue-200" />
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={"ellipsis-" + index}
            className="px-2 text-blue-400 dark:text-blue-600"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            disabled={currentPage === page}
            className={`px-4 py-2 rounded-md transition text-sm font-medium cursor-pointer 
              ${
                page === currentPage
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-transparent text-blue-800 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-800"
              }
              disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPage}
        className="rounded-md p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowRight size={16} className="text-blue-800 dark:text-blue-200" />
      </button>
    </div>
  );
};

export default Pagination;
