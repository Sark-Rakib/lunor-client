const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-12 space-y-4">
      {/* buttons */}
      <div className="flex justify-center gap-2 flex-wrap">
        <button
          className="btn btn-sm btn-outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          « Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`btn btn-sm ${
              currentPage === page
                ? "bg-gray-500 text-white border-gray-500"
                : "btn-outline"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="btn btn-sm btn-outline"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next »
        </button>
      </div>

      {/* showing info */}
      <div className="text-center text-gray-600">
        Showing {startItem}–{endItem} of {totalItems} products
      </div>
    </div>
  );
};

export default Pagination;
