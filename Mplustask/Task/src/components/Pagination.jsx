const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
    
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed text-gray-600"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        Previous
      </button>

    
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-lg font-semibold transition ${
              currentPage === page
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            }`}
          >
            {page}
          </button>
        );
      })}

      
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed text-gray-600"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
